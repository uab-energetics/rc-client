import { Component, OnInit } from '@angular/core'
import {MatDialog} from '@angular/material'
import {ProjectListModalComponent} from '../../core/projects/components/project-list-modal/project-list-modal.component'
import {dispatcher} from '../../core/dispatcher/dispatcher'
import {OPEN_PROJECT_LIST} from '../../core/projects/actions'

@Component({
  selector: 'app-layout',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private dialog: MatDialog) {

    dispatcher.on(OPEN_PROJECT_LIST, () => {
      this.dialog.open(ProjectListModalComponent, {
        height: '500px',
        width: '500px'
      })
    })

  }

  ngOnInit() {
  }

}
