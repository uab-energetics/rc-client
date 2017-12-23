import {AppResponse} from "../../models/AppResponse";

export function renderToString(response: AppResponse){
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
