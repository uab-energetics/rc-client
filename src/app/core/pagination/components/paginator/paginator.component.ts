import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PagesData} from "../../Paginator";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() pageData: PagesData;
  @Input() offset: number = 3;

  @Output() goto = new EventEmitter<number>();

  links = [];

  ngOnInit() {
    this.load();
  }

  ngOnChanges() {
    this.load();
  }

  load(){
    if(!this.pageData) return;
    console.log(this.pageData);
    this.links = [];
    let cp = this.pageData.currentPage;
    let lp = this.pageData.lastPage;
    let off = this.offset;
    let stop = Math.min(lp, cp + off);
    let start = Math.max(1, cp - off);
    for(let i = start; i <= stop; i++){
      this.links.push(i);
    }
  }

}
