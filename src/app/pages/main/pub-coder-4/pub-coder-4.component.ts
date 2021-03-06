import { Component, OnInit } from '@angular/core';
import {Codebook} from "../../../core/codebooks/Codebook";
import {mockCodebook} from "../../../core/codebooks/mocks/codebook.mock";

@Component({
  selector: 'app-pub-coder-4',
  templateUrl: './pub-coder-4.component.html',
  styleUrls: ['./pub-coder-4.component.scss']
})
export class PubCoder4Component implements OnInit {

  codebook: Codebook
  encoding: any

  constructor() { }

  ngOnInit() {
    this.codebook = mockCodebook
    this.encoding = {
      usesCodebook: 'murine-rigor-mice-analysis@1.0.0',
      rootType: 'publication',
      root: {}
    }
  }

}
