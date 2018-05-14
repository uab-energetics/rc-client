
import {Observable} from "rxjs/Observable"
import {Subject} from "rxjs/Subject"
import {PaginatedResult} from "./PaginatedResult"
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/pluck'
import * as EventEmitter from 'events'

interface SearchRequest {
  search: string
  page: number
  page_size: number
}

export interface PagesData {
  lastPage: number
  currentPage: number
}

export class Paginator<T> {

  private search: string = ""
  private page: number = 1
  private pageSize: number = 15

  public data$: Observable<T[]>
  public pages$: Observable<PagesData>

  public pageSizeStream$ = new Subject<number>()
  public searchStream$ = new Subject<string>()
  public pageStream$ = new Subject<number>()

  public events = new EventEmitter()

  constructor(dataSource: Function){
    const searchSource: Observable<SearchRequest> = this.searchStream$
      .debounceTime(1000)
      .distinctUntilChanged()
      .map( search => {
        this.search = search
        return { search, page: 1, page_size: this.pageSize }
      })

    const clickSource: Observable<SearchRequest> = this.pageStream$
      .map( page => {
        this.page = page
        return { search: this.search, page, page_size: this.pageSize }
      })

    const pageSizeSource: Observable<SearchRequest> = this.pageSizeStream$
      .distinctUntilChanged()
      .map( pageSize => {
        this.pageSize = pageSize
        return { search: this.search, page: 1, page_size: pageSize }
      })

    const source: Observable<PaginatedResult<T>> = searchSource
      .merge(clickSource)
      .merge(pageSizeSource)
      .startWith({ search: this.search, page: this.page, page_size: this.pageSize })
      .mergeMap( paginationOptions => {
        this.events.emit('request_start')
        return dataSource({
          page: paginationOptions.page,
          search: paginationOptions.search,
          page_size: paginationOptions.page_size
        })
      })

    this.pages$ = source
      .map( results => { return {
        lastPage: results.last_page,
        currentPage: results.current_page
      }})

    this.data$ = source.pluck('data')
  }

}
