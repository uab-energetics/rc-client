import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormFiller} from "../../../../lib/rc-forms/form-filler/FormFiller";
import {InputEvent} from "../../../../lib/rc-forms/components/InputEvent";
import {Subject} from "rxjs/Subject";
import {responseUpdated, ResponseUpdated} from "../../../../lib/rc-forms/form-filler/events/InputEdited";

@Component({
  selector: 'app-pc-body',
  templateUrl: './pc-body.component.html',
  styleUrls: ['./pc-body.component.scss']
})
export class PcBodyComponent implements OnInit {

  @Input() formFiller: FormFiller
  @Output() encodingChange = new EventEmitter<ResponseUpdated>()

  codebook
  childInputStream$ = new Subject<InputEvent>()

  ngOnInit() {

    this.childInputStream$
      .map<InputEvent, ResponseUpdated>(event => responseUpdated(event))
      .do(console.log)
      .subscribe(event => this.encodingChange.emit(event))

    this.codebook = {
      root: {
        type: 'group',
        title: "Experiment",
        prompt: "Answer the following questions about the paper",
        fields: {
          studyLevelQuestions: {
            type: 'group',
            title: 'Constant Level Questions',
            fields: {
              questionOne: {
                type: 'text',
                prompt: 'Example Text Question',
                title: 'this is an example text question'
              },
              questionTwo: {
                type: 'number',
                prompt: 'Example Number Question',
                title: 'this is an example number question'
              },
              questionThree: {
                type: 'select',
                title: "Example Select",
                prompt: "this is an example select question",
                options: ['yes', 'no']
              }
            }
          },
          branches: {
            type: 'group-list',
            title: "Study Branches",
            prompt: "List the branches in this experiment",
            listItem: {
              type: 'group',
              fields: {
                questionOne: {
                  type: 'text',
                  prompt: 'Example Text Question',
                  title: 'this is an example text question'
                },
                questionTwo: {
                  type: 'number',
                  prompt: 'Example Number Question',
                  title: 'this is an example number question'
                },
                questionThree: {
                  type: 'multi-select',
                  title: "Example Multi-Select",
                  prompt: "What's your favorite cheese?",
                  options: ['Muenster', 'White Cheddar', 'Edam', 'Amish', 'Gouda']
                }
              }
            }
          }
        }
      }
    }
  }
}
