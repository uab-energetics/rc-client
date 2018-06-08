import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

const CTRL = 'ctrlKey'
const ALT = 'altKey'
const SHIFT = 'shiftKey'

const CTRL_SYM = 'ctrl'
const ALT_SYM = 'alt'
const SHIFT_SYM = 'shift'

const ASCII_DELIMITER = '+'

export interface HotKeyEvent {
  event: any // the HTML dom event
  pattern: string // the original ascii pattern provided
}

export const hotKeyStream = (ascii: string): Observable<HotKeyEvent> => {
  const tokens = ascii.replace(/\s/g, '')
    .split(ASCII_DELIMITER)
    .map( tkn => {
      if(tkn === CTRL_SYM) return CTRL
      if(tkn === ALT_SYM) return ALT
      if(tkn === SHIFT_SYM) return SHIFT
      return tkn
    })

  const stream$ = new Subject<HotKeyEvent>()

  document.addEventListener('keydown', event => {

    let fullMatch = true

    tokens.forEach( tkn => {
      if(!(event[tkn] || event.key === tkn))
        fullMatch = false
    })

    if(fullMatch) {
      event.preventDefault()
      stream$.next({ event, pattern: ascii })
    }
  })

  return stream$.asObservable()
}
