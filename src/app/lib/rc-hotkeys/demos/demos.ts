import {hotKeyStream} from "../hotKeyStream";


const patterns = [
  'ctrl + s',
  'ctrl + shift + s',
  'ctrl + alt + w',
  'alt + j',
  'ctrl + w'
]

patterns.map(hotKeyStream).forEach( stream => {
  stream.subscribe( event => console.log(`received: ${event.pattern}`))
})
