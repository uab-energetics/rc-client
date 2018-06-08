import {Component, OnInit} from '@angular/core';
import {NotifyService} from "../../../core/notifications/notify.service";
import {Observable} from "rxjs/Observable";
import {DynamicForm} from "../../../core/rc-form-manager/DynamicForm";
import {hotKeyStream} from "../../../lib/rc-hotkeys/hotKeyStream";
import {FormFiller} from "../../../lib/rc-forms/form-filler/FormFiller";

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
  formFiller: FormFiller
  form$: Observable<DynamicForm>

  /* DEPENDENCY INJECTION */
  constructor(public notify: NotifyService) {}

  /* BOOTSTRAPPING */
  ngOnInit() {
    this.formFiller = new FormFiller({}) // TODO - use an encoding from the server
    this.form$ = this.formFiller.watch()
    this.registerHotKeys()
  }

  private registerHotKeys(){
    hotKeyStream('ctrl + r') // this prevents Chrome's native reload hotkey
    hotKeyStream('ctrl + s').subscribe( _ => {
      this.notify.toast('Saved Encoding') // it auto-saves. hehe
    })
    hotKeyStream('ctrl + z').subscribe( _ => {
      if(!this.formFiller.undo())
        this.notify.toast("Nothing to Undo!")
    })
    hotKeyStream('ctrl + y').subscribe( _ => {
      if(!this.formFiller.redo())
        this.notify.toast("Nothing to Redo!")
    })
  }
}
