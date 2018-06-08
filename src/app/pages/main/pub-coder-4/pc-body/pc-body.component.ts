import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Codebook} from "../../../../core/codebooks/Codebook"

@Component({
  selector: 'app-pc-body',
  templateUrl: './pc-body.component.html',
  styleUrls: ['./pc-body.component.scss']
})
export class PcBodyComponent implements OnInit {

  @Input()
  codebook: Codebook

  @Output()
  encodingChange = new EventEmitter()

  ngOnInit() {
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
                  type: 'select',
                  title: "Example Select",
                  prompt: "this is an example select question"
                }
              }
            }
          }
        }
      }
    }
  }
}
