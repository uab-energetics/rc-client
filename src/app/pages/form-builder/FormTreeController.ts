import {FormService} from '../../shared/services/form.service';
import {
  ADD_CATEGORY, ADD_QUESTION, DEL_CATEGORY, DEL_QUESTION, MOVE_CATEGORY, MOVE_QUESTION
} from './actions';
import {AppForm} from '../../models/AppForm';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

export class FormStore {

  private _changes;
  public changes;

  constructor(
    private formService: FormService,
    private formID
  ) {
    let source = Observable.create( subject => this._changes = subject );
    source.subscribe();
    this.changes = source;
    this.emitChange();
  }

  private emitChange() {
    console.log('emitting form...');
    this.formService.getForm(this.formID)
      .subscribe(form => this._changes.next(form));
  }

  dispatch(action) {
    switch (action.type) {
      case MOVE_QUESTION:
        this.formService.moveQuestion(this.formID, action.questionID, action.categoryID)
          .subscribe(this.emitChange);
        break;
      case MOVE_CATEGORY:
        this.formService.moveCategory(this.formID, action.categoryID, action.parentID)
          .subscribe(this.emitChange);
        break;
      case ADD_QUESTION:
        this.formService.addQuestion(this.formID, action.question, action.parentID)
          .subscribe(this.emitChange);
        break;
      case DEL_QUESTION:
        this.formService.deleteQuestion(this.formID, action.questionID)
          .subscribe(this.emitChange);
        break;
      case DEL_CATEGORY:
        this.formService.deleteCategory(this.formID, action.categoryID)
          .subscribe(this.emitChange);
        break;
      case ADD_CATEGORY:
        this.formService.addCategory(this.formID, action.category, action.parentID)
          .subscribe(this.emitChange);
        break;
    }
  }


}
