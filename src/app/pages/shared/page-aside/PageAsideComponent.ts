import {OnDestroy, OnInit} from "@angular/core";


export abstract class PageAsideComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    document.body.classList.remove('page-aside-fixed', 'page-aside-left')
  }

  ngOnInit(): void {
    document.body.classList.add('page-aside-fixed', 'page-aside-left')
  }

}
