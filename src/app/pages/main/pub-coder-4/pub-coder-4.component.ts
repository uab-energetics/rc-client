import {Component, OnInit} from '@angular/core';
import {NotifyService} from "../../../core/notifications/notify.service";
import {FormManager} from "../../../core/rc-form-manager/FormManager";
import {Observable} from "rxjs/Observable";
import {DynamicForm} from "../../../core/rc-form-manager/DynamicForm";
import {hotKeyStream} from "../../../lib/rc-hotkeys/hotKeyStream";

@Component({
  selector: 'app-pub-coder-4',
  templateUrl: './pub-coder-4.component.html',
  styleUrls: ['./pub-coder-4.component.scss']
})
export class PubCoder4Component implements OnInit {

  /* COMPOSITION ROOT */
  codebook: any // TODO
  article: any = { embeddingURL: "https://www.ncbi.nlm.nih.gov/pubmed/29874688" } // TODO
  encoding = { root: {} }

  /* EVENT HANDLING */
  formManager: FormManager
  form$: Observable<DynamicForm>

  /* DEPENDENCY INJECTION */
  constructor(public notify: NotifyService) {}

  /* BOOTSTRAPPING */
  ngOnInit() {
    this.formManager = new FormManager({}) // TODO - use an encoding from the server
    this.form$ = this.formManager.watch()
    this.registerHotKeys()
  }

  private registerHotKeys(){
    hotKeyStream('ctrl + s').subscribe( _ => this.notify.toast('Saved Encoding') )
  }
}
