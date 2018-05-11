import {Component, Input} from '@angular/core'
import {NotifyService} from '../../../../core/notifications/notify.service'
import {Router} from '@angular/router'
import {ProjectFormService} from '../../../../shared/services/project-form.service'
import {AppProject} from '../../../../models/AppProject'
import {AppForm} from '../../../../models/AppForm'
import {AppProjectFormSettings} from '../../../../models/AppProjectFormSettings'


@Component({
  selector: 'app-project-form-settings',
  templateUrl: './project-form-settings.component.html',
  styleUrls: ['./project-form-settings.component.css']
})
export class ProjectFormSettingsComponent {

  @Input() project: AppProject;
  @Input() form: AppForm;

  settings: AppProjectFormSettings = {
    task_target_publication: 0,
    task_target_encoder: 0,
    auto_enroll: true,
    inherit_publications: true,
  };

  loading = 0;

  constructor(
    private router: Router,
    private notify: NotifyService,
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
      .subscribe(settings => {
        this.notify.toast('Settings updated');
        this.settings = settings;
      });
  }

  onFormSubmit() {
    this.updateSettings();
  }


}
