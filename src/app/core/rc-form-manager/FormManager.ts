import {Observable} from "rxjs/Observable";
import {DynamicForm} from "./DynamicForm";
import {Subject} from "rxjs/Subject";
import {FormEvent} from "./events/FormEvent";
import {tap} from "rxjs/operators";
import {reduceForm} from "./formReducer";
import "rxjs/add/operator/scan";

export class FormManager {

  form: DynamicForm = {}
  eventHistory: FormEvent[] = []
  events$: Subject<FormEvent> = new Subject()

  constructor(private form: DynamicForm = {}) {
    this.form = form
    this.events$.pipe(tap(E => this.eventHistory.push(E))).subscribe()
  }

  digest = (event: FormEvent): void => this.events$.next(event)

  watch = (): Observable<DynamicForm> => this.events$.scan(reduceForm, this.form)

  applyEvents = (events: FormEvent[]) => events.reduce(reduceForm, this.form)

  clearHistory = () => this.eventHistory = []
}
