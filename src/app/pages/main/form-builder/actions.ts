import {AppCategory} from "../../../models/AppCategory";
import {AppQuestion} from '../../../models/AppQuestion'

export const enum CodeBookActions {
  DEL_QUESTION,
  DEL_CATEGORY,
  MOVE_QUESTION,
  MOVE_CATEGORY,
  ADD_QUESTION,
  ADD_CATEGORY,
  EDIT_QUESTION,
  EDIT_CATEGORY
}

export function deleteQuestion(id: number) {
  return {
    type: CodeBookActions.DEL_QUESTION,
    id
  }
}
export function deleteCategory(id: number) {
  return {
    type: CodeBookActions.DEL_CATEGORY,
    id
  }
}


export function moveQuestion(id: number, newCategoryID: number) {
  return {
    type: CodeBookActions.MOVE_QUESTION,
    id,
    newCategoryID
  }
}
export function moveCategory(id: number, newParentID: number) {
  return {
    type: CodeBookActions.MOVE_CATEGORY,
    id,
    newParentID
  }
}


export function addQuestion(data: AppQuestion, categoryID: number) {
  return {
    type: CodeBookActions.ADD_QUESTION,
    data,
    categoryID
  }
}
export function addCategory(data: AppCategory, parentID: number) {
  return {
    type: CodeBookActions.ADD_CATEGORY,
    data,
    parentID
  }
}


export function editQuestion(id: number, data: AppQuestion){
  return {
    type: CodeBookActions.EDIT_QUESTION,
    id,
    data
  }
}
export function editCategory(id: number, data: AppCategory){
  return {
    type: CodeBookActions.EDIT_CATEGORY,
    id,
    data
  }
}
