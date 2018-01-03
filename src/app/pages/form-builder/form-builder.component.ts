import {Component, OnInit} from '@angular/core';
import {AppForm} from "../../models/AppForm";
import {MatSnackBar} from "@angular/material";
import {FormService} from "../../shared/services/form.service";
import {ActivatedRoute} from "@angular/router";
import {AppCategory} from "../../models/AppCategory";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  providers: [MatSnackBar, FormService]
})
export class FormBuilderComponent implements OnInit {

  previewingCategory: AppCategory;
  form: AppForm;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private formService: FormService
  ) {}

  ngOnInit() {
    let formID = +this.route.snapshot.paramMap.get('id');
    this.loadForm(formID)
      .subscribe(form => this.categorySelected(form.root_category.id))
  }

  loadForm(id) {
    this.loading = true;
    let src = this.formService.getForm(id)
      .finally(() => this.loading = false);
    src.subscribe(form => this.form = form);
    return src;
  }

  private fulfill(observable: Observable<any>) {
    this.loading = true;
    return observable
      .finally(() => this.loading = false)
      .subscribe(
        data => {
          this.loadForm(this.form.id);
          if(this.previewingCategory)
            this.categorySelected(this.previewingCategory.id);
        },
        err => {
          // TODO - decide on an elegant way to handle errors
        }
      )
  }

  createQuestion($event) {
    return this.fulfill(
      this.formService.addQuestion(
        this.form.id,
        $event.data,
        $event.categoryID
      )
    );
  }

  deleteQuestion($event) {
    return this.fulfill(
      this.formService.deleteQuestion(
        this.form.id,
        $event.id
      )
    );
  }

  moveQuestion($event) {
    return this.fulfill(
      this.formService.moveQuestion(
        this.form.id,
        $event.id,
        $event.categoryID
      )
    )
  }

  createCategory($event) {
    return this.fulfill(
      this.formService.addCategory(
        this.form.id,
        $event.data,
        $event.parentID
      )
    )
  }

  deleteCategory($event) {
    return this.fulfill(
      this.formService.deleteCategory(
        this.form.id,
        $event.id
      )
    )
  }

  moveCategory($event) {
    return this.fulfill(
      this.formService.moveCategory(
        this.form.id,
        $event.id,
        $event.newParentID
      )
    )
  }

  categorySelected($event: number) {
    this.formService.getCategory(this.form.id, $event)
      .subscribe(category => this.previewingCategory = category)
  }

  /* TODO - implement 'edit' functions in the data-service */
  editQuestion($event) {
    return this.formService.moveCategory(this.form.id, $event.categoryID, $event.parentID);
  }

  editCategory($event) {
    return this.formService.addCategory(this.form.id, $event.data, $event.parentID);
  }
  /* TODO - implement 'edit' functions in the data-service */

}
