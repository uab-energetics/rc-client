import {Subject} from "rxjs/Subject"
import {FormEvent} from "./events/FormEvent"
import "rxjs/add/operator/scan"
import {BehaviorSubject} from "rxjs/BehaviorSubject"
import {lookup} from "./query";
import {RcFormData} from "./types/RcFormData";

import {reduceFormData} from "./reducers/formData";

export class FormFiller {

  formData$: BehaviorSubject<RcFormData> = new BehaviorSubject<RcFormData>(null)

  eventHistory: FormEvent[] = []
  undoStack: FormEvent[] = []
  events$: Subject<FormEvent> = new Subject()

  constructor(private data: RcFormData = null) {
    this.formData$ = new BehaviorSubject<RcFormData>(data)
    this.events$.subscribe(E => {
      this.eventHistory.push(E)
      this.formData$.next(reduceFormData(this.formData$.getValue(), E))
    })
  }

  watch = () => this.formData$.asObservable()

  lookup = (key: string) => lookup(this.formData$.getValue(), key)
  lookupEncodingData = (key: string) => this.lookup('encoding.' + key)
  lookupMetaData = (key: string) => this.lookup('meta.' + key)

  digest = (event: FormEvent): void => {
    this.undoStack = []
    this.events$.next(event)
  }

  undo = () => {
    if(this.eventHistory.length === 0)
      return false
    this.undoStack.push(this.eventHistory.pop())
    this.formData$.next(this.eventHistory.reduce(reduceFormData, null))
    return true
  }

  redo = () => {
    if(this.undoStack.length === 0) return false
    this.events$.next(this.undoStack.pop())
    return true
  }

}
