import {Component, Input, OnInit} from '@angular/core';
import {Codebook} from "../../../../core/codebooks/Codebook";

@Component({
  selector: 'app-pc-body',
  templateUrl: './pc-body.component.html',
  styleUrls: ['./pc-body.component.scss']
})
export class PcBodyComponent implements OnInit {

  @Input() codebook: Codebook

  constructor() { }

  ngOnInit() {
  }

}
