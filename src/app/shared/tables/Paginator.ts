import {BehaviorSubject} from "rxjs/BehaviorSubject";


export class Paginator<T = any> {

  private _source = new BehaviorSubject<T[]>([]);
  public changes = this._source.asObservable();

  private limit: number;
  private offset: number;


  dataBuffer;
  activeRows;

  public page(): number {
    return Math.floor(this.offset / this.limit);
  }

  public goto(page: number) {
    this.offset = Math.min(this.calculateOffset(page, this.limit), this.maxOffset());
    this.updateActiveRows();
  }

  public next(): void {
    if(!this.hasNext())
      return;
    this.offset += this.limit;
    this.updateActiveRows();
  }

  public prev(): void {
    if(!this.hasPrev())
      return;
    this.offset -= Math.min(this.limit, this.offset);
    this.updateActiveRows();
  }

  public hasNext(): boolean {
    return this.offset + this.limit < this.dataBuffer.length;
  }

  public hasPrev(): boolean {
      return this.offset > 0;
  }

  public setRowsPerPage(rowsPerPage: number): void {
    this.limit = rowsPerPage;
    this.offset -= this.offset % this.limit;
    this.updateActiveRows();
  }

  constructor( data: T[] = [], rowsPerPage = 10, page = 0 ) {
  	this.dataBuffer = data;
    this.limit = rowsPerPage;
    this.offset = this.calculateOffset(page, this.limit);
    this.updateActiveRows();
  }

  private calculateOffset(page, pageSize) {
    return Math.max(page, 0) * pageSize;
  }

  private maxOffset() {
    return this.dataBuffer.length - this.dataBuffer.length % this.limit;
  }

  private updateActiveRows() {
    this.activeRows = this.dataBuffer.slice(
      this.offset,
      this.offset + this.limit
    );
    this._source.next(this.activeRows);
  }
}
