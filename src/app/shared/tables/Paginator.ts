import {BehaviorSubject} from "rxjs/BehaviorSubject";


export class Paginator {

  private _source = new BehaviorSubject([]);
  public changes = this._source.asObservable();

  rowsPerPage;
  page;

  dataBuffer;
  activeRows;

  public next(): void {
    let startRecord = (this.page+1) * this.rowsPerPage;
    if(startRecord >= this.dataBuffer.length)
      return;
    this.page++;
    this.updateActiveRows();
  }

  public prev(): void {
    if(this.page === 0)
      return;
    this.page--;
    this.updateActiveRows();
  }

  public setRowsPerPage(rowsPerPage: number): void {
    this.rowsPerPage = rowsPerPage;
    this.updateActiveRows();
  }

  constructor({ data = [], rowsPerPage = 10, page = 0 }) {
  	this.dataBuffer = data;
	this.rowsPerPage = rowsPerPage;
	this.page = page;
	this.updateActiveRows();
  }


  private updateActiveRows() {
    let start = this.page * this.rowsPerPage;
    this.activeRows = this.dataBuffer.slice(
      start,
      start + this.rowsPerPage
    );
    this._source.next(this.activeRows);
  }
}
