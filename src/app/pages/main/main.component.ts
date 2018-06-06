import { Component, OnInit } from '@angular/core'
import {MatDialog} from '@angular/material'
import {ProjectListModalComponent} from '../../core/projects/components/project-list-modal/project-list-modal.component'
import {dispatcher} from '../../core/dispatcher/dispatcher'
import {OPEN_PROJECT_LIST} from '../../core/projects/actions'

@Component({
  selector: 'app-layout',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  opener = () => {
    let dialogRef = this.dialog.open(ProjectListModalComponent, {
      height: '500px',
      width: '700px'
    })
  }

  constructor(private dialog: MatDialog) {
    this.opener = this.opener.bind(this)
  }

  ngOnInit() {
    dispatcher.on(OPEN_PROJECT_LIST, this.opener)
  }

  ngOnDestroy() {
    dispatcher.removeListener(OPEN_PROJECT_LIST, this.opener)
  }

}
