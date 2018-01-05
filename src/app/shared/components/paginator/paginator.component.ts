import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() currentPage;
  @Input() lastPage;

  @Output() goto = new EventEmitter<number>();

  constructor() { }

  links = [];

  ngOnInit() {
    this.links = [];
    let cp = this.currentPage;
    let lp = this.lastPage;
    let off = 5;
    let stop = Math.min(lp, cp + off);
    let start = Math.max(1, cp - off);
    for(let i = start; i <= stop; i++){
      this.links.push(i);
    }
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  onGoto(pageNumber: number){
    if(pageNumber === this.currentPage) return;
    this.goto.emit(pageNumber);
  }

}
