import {AppResponse} from "./AppResponse";
import {RESPONSE_FORMATS as fmt} from "./formats";

export function renderToString(response: AppResponse){
  if(!response) return '';
  if(typeof response === 'string')
    return response;
  switch (response.type){
    case fmt.TEXT:
      return response.txt;
    case fmt.SELECT:
      return response.sel;
    case fmt.BOOLEAN:
      return response.boo;
    case fmt.NUMBER:
      return response.num;
    case fmt.MULTI_SELECT:
      return response.selections.map(sel => sel.txt).join(', ');
    case fmt.NOT_REPORTED:
      return 'NOT_REPORTED';
  }
}
