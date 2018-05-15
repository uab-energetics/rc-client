import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {ProjectFormService} from "../../../projects/project-form.service"
import {AppProjectForm} from "../../../forms/AppProjectForm";

@Component({
  selector: 'app-find-task',
  templateUrl: './find-task.component.html',
  styleUrls: ['./find-task.component.css']
})
export class FindTaskComponent implements OnInit {

  projectForms: AppProjectForm[] = []
  selectedProjectForm: AppProjectForm = null

  loading = 0;

  constructor(
    private fb: FormBuilder,
    private projectFormService: ProjectFormService
  ) { }

  ngOnInit() {
    this.loadForms();
  }

  loadForms() {
    this.loading++;
    this.projectFormService.getProjectFormsEncoder()
      .finally(() => this.loading--)
      .map(projectForms => projectForms.filter(projectForm => projectForm.form !== null))
      .subscribe( projectForms => {
        this.projectForms = projectForms

        if (projectForms.length > 0) {
          this.selectedProjectForm = projectForms[0]
        }
      } );
  }

}
