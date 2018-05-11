import {Component, OnInit} from '@angular/core'
import {MatSnackBar} from "@angular/material"
import {ActivatedRoute} from "@angular/router"
import {Observable} from "rxjs/Observable"
import {FormService} from '../../../core/forms/form.service'
import {AppCategory} from '../../../core/form-categories/AppCategory'
import {AppForm} from '../../../core/forms/AppForm'

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  providers: [MatSnackBar, FormService]
})
export class FormBuilderComponent implements OnInit {

  previewingCategory: AppCategory
  form: AppForm
  loading = 0

  constructor(
    private route: ActivatedRoute,
    private formService: FormService
  ) {}

  ngOnInit() {
    const formID = +this.route.snapshot.paramMap.get('id')
    this.loadForm(formID)
      .subscribe(form => this.categorySelected(form.root_category.id))
  }

  loadForm(id) {
    this.loading = 1
    const src = this.formService.getForm(id)
      .finally(() => this.loading = 0)
    src.subscribe(form => this.form = form)
    return src
  }

  private fulfill(observable: Observable<any>) {
    this.loading = 1
    return observable
      .finally(() => this.loading = 0)
      .subscribe(
        data => {
          this.loadForm(this.form.id)
          if (this.previewingCategory)
            this.categorySelected(this.previewingCategory.id)
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
    )
  }

  deleteQuestion($event) {
    return this.fulfill(
      this.formService.deleteQuestion(
        this.form.id,
        $event.id
      )
    )
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
    return this.fulfill(
      this.formService.editQuestion(
        this.form.id,
        $event.id,
        $event.data
      )
    )
  }

  editCategory($event) {
    return this.fulfill(
      this.formService.editCategory(
        this.form.id,
        $event.id,
        $event.data
      )
    )
  }
  /* TODO - implement 'edit' functions in the data-service */

}
