import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppProject} from "../../../../models/Project";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  @Output() appSubmit = new EventEmitter<AppProject>();
  @Input() projectModel: AppProject;

  ngOnInit() {
    if(!this.projectModel){
      this.projectModel  = { name: '', description: '' };
    }
  }

  onSubmit(){
    this.appSubmit.emit(Object.assign({}, this.projectModel));
  }

}
