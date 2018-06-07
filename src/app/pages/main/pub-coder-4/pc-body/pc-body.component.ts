import {Component, Input, OnInit} from '@angular/core'
import {Codebook} from "../../../../core/codebooks/Codebook"

@Component({
  selector: 'app-pc-body',
  templateUrl: './pc-body.component.html',
  styleUrls: ['./pc-body.component.scss']
})
export class PcBodyComponent implements OnInit {

  @Input()
  codebook: Codebook

  ngOnInit() {
    this.codebook = {
      root: {
        type: 'group',
        title: "Paper Questions",
        prompt: "Answer the following questions about the paper",
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
          },
          experiments: {
            type: 'group',
            list: true,
            title: 'Paper Experiments',
            prompt: 'List the experiments described in the article',
            fields: {
              expName: {
                type: 'text',
                title: 'Experiment Name',
                prompt: 'List the experiment Name'
              },
              branches: {
                type: 'group',
                title: "Study Branches",
                prompt: "List the branches in this experiment",
                list: true,
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
}
