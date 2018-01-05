import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoggerService} from "../../../shared/logger.service";
import {NotifyService} from "../../../shared/services/notify.service";
import {Router} from '@angular/router';
import {loadingPipe} from '../../../shared/helpers';
import {ProjectFormService} from "../../../shared/services/project-form.service";
import {AppProject} from "../../../models/AppProject";
import {AppForm} from "../../../models/AppForm";
import {AppProjectFormSettings} from "../../../models/AppProjectFormSettings";


@Component({
  selector: 'app-project-form-settings',
  templateUrl: './project-form-settings.component.html',
  styleUrls: ['./project-form-settings.component.css']
})
export class ProjectFormSettingsComponent {

  @Input() project: AppProject;
  @Input() form: AppForm;

  settings: AppProjectFormSettings;

  loading = 0;

  constructor(
    private router: Router,
    private notify: NotifyService,
    private logger: LoggerService,
    private projectFormService: ProjectFormService,
  ) { }

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    this.loading++;
    this.projectFormService.getSettings(this.project, this.form)
      .finally(() => this.loading--)
      .subscribe(settings => this.settings = settings);
  }


  updateSettings() {
    this.loading++;
    this.projectFormService.updateSettings(this.project, this.form, this.settings)
      .finally(() => this.loading--)
      .subscribe(settings => this.settings = settings);
  }

  onFormSubmit() {
    this.updateSettings();
  }




}