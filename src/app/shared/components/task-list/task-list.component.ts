import {Component, Input, OnInit} from '@angular/core';
import {AppExperimentEncoding} from "../../../models/ExperimentEncoding";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() tasks;

  constructor() { }

  ngOnInit() {
  }

  findTasks(){
    alert('coming soon!');
  }

}
