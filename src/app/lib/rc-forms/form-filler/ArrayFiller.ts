import * as lodash from "lodash"
import {Subject} from "rxjs/Subject"
import {BehaviorSubject} from "rxjs/BehaviorSubject"
import {merge} from "rxjs/observable/merge"

/**
 * produces observable stream of a group control spec
 *
 * - provide the list item template. this will be the spec used when adding fillable entries
 * - provide the full control spec. needed
 */

export class ArrayFiller {

  public fields$ = new BehaviorSubject<{ [key: string]: {} }>({})

  add$ = new Subject<string>()
  delete$ = new Subject<string>()

  constructor(private listItemTemplate) {
    let deletes$ = this.delete$.map( key => {
      let current = this.fields$.getValue()
      delete current[key]
      return current
    })

    let adds$ = this.add$.map(key => {
      let current = this.fields$.getValue()
      return { ...current, [key]: this.getItemTemplate() }
    })

    merge(deletes$, adds$)
      .subscribe( fields => this.fields$.next(fields) )
  }

  generateKey = () => Math.random().toString(36).substring(7)

  getItemTemplate = () => JSON.parse(JSON.stringify(this.listItemTemplate))
}
