import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PubRepo} from "../../PubRepo";

@Component({
  selector: 'app-pub-repo-form',
  templateUrl: './pub-repo-form.component.html',
  styleUrls: ['./pub-repo-form.component.css']
})
export class PubRepoFormComponent implements OnInit {

  @Output()
  formSubmit = new EventEmitter<PubRepo>()

  @Input()
  formModel: PubRepo;

  ngOnInit() {
    if(!this.formModel) {
      this.formModel = {
        displayName: ''
      }
    }
  }

  handleSubmit() {
    this.formSubmit.emit({ ...this.formModel })
  }

}
