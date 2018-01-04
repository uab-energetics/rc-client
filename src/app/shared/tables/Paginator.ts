import {BehaviorSubject} from "rxjs/BehaviorSubject";


export class Paginator {

  private _source = new BehaviorSubject([]);
  public changes = this._source.asObservable();

  private limit: number;
  private offset: number;


  dataBuffer;
  activeRows;

  public page(): number {
    return Math.floor(this.offset / this.limit);
  }

  public next(): void {
    if(!this.hasNext())
      return;
    this.page++;
    this.updateActiveRows();
  }

  public prev(): void {
    if(!this.hasPrev())
      return;
    this.page--;
    this.updateActiveRows();
  }

  public hasNext(): boolean {
    return offset + limit < this.dataBuffer.length;
  }

  public hasPrev(): boolean {
      return this.page > 0;
  }

  public setRowsPerPage(rowsPerPage: number): void {
    this.limit = rowsPerPage;
    this.updateActiveRows();
  }

  constructor({ data = [], rowsPerPage = 10, page = 0 }) {
  	this.dataBuffer = data;
    this.limit = rowsPerPage;
    this.offset = page * rowsPerPage;
    this.updateActiveRows();
  }


  private updateActiveRows() {
    this.activeRows = this.dataBuffer.slice(
      offset,
      offset + limit
    );
    this._source.next(this.activeRows);
  }
}
