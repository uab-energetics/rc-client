import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'app-pc-form-group',
  templateUrl: './pc-form-group.component.html',
  styleUrls: ['./pc-form-group.component.scss']
})
export class PcFormGroupComponent implements OnInit {

  @Input() pcFormGroup
  @Input() key: string

  fields(group) {
    return Object.entries(group).map(([key, field]) => ({ key, field }))
  }

  getWrapperClass(field) {
    return {
      'pc-question': field.type !== 'group',
      'pc-group': field.type === 'group'
    }
  }

  ngOnInit() {
    console.log('Group Component Key: ', this.key, this.pcFormGroup)
  }

}
