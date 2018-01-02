import {AppResponse} from "../../models/AppResponse";

export const NO_RESPONSE = 'NO_RESPONSE';

export function renderToString(response: AppResponse){
  if(!response) return NO_RESPONSE;
  switch (response.type){
    case "txt":
      return response.txt;
    case "sel":
      return response.sel;
    case "boo":
      return response.boo;
    case "num":
      return response.num;
    case "multi-sel":
      return response.selections.map(sel => sel.txt).join(', ');
  }
}
