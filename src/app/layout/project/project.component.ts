import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Form} from "../../models/Form";
import {ProjectService} from "../../shared/services/project.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectID;
  formFormModal: NgbActiveModal;
  projectForms: Form[];
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public snackBar: MatSnackBar,
    private projectService: ProjectService
  ) { }

  onFormFormSubmit(newForm: Form){
    this.showLoader = true;
    this.projectService.createForm(this.projectID, newForm)
      .then( _newForm  => {
        this.projectForms.push(_newForm);
        this.snackBar.open('Form Created!', 'Ok', { verticalPosition: 'top' })
      })
      .catch( err => console.error(err) )
      .then(()=> {
        this.formFormModal.close();
        this.showLoader = false;
      });
  }

  ngOnInit() {
    this.projectID = this.route.snapshot.paramMap.get('id');
    this.projectForms = [
      {
        id: 123,
        name: 'Murine Rigor',
        description: 'asdfads fsa fdsadsf adsas dfsadfdsafad sfads sadf',
        published: false,
        type: 'experiment'
      }
    ]
  }

  openFormForm(content) {
    this.formFormModal = this.modalService.open(content)
  }

}
