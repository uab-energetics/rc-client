import {AppQuestion} from "../../models/AppQuestion";
import {AppCategory} from "../../models/AppCategory";

export const DEL_QUESTION = 'del_q';
export const DEL_CATEGORY = 'del_c';
export const MOVE_QUESTION = 'mv_q';
export const MOVE_CATEGORY = 'mv_c';
export const SELECT_CATEGORY = 'sel_c';
export const ADD_QUESTION = 'add_q';
export const ADD_CATEGORY = 'add_c';
export const SHOW_ADD_QUESTION = 'show_add_q';

export function deleteQuestion(questionID: number) {
  return {
    type: DEL_QUESTION,
    questionID
  }
}

export function deleteCategory(categoryID: number) {
  return {
    type: DEL_CATEGORY,
    categoryID
  }
}

export function moveQuestion(questionID: number, categoryID: number) {
  return {
    type: MOVE_QUESTION,
    questionID,
    categoryID
  }
}

export function moveCategory(categoryID: number, parentID: number) {
  return {
    type: MOVE_CATEGORY,
    categoryID,
    parentID
  }
}

export function selectCategory(categoryID: number) {
  return {
    type: SELECT_CATEGORY,
    categoryID
  }
}

export function addQuestion(question: AppQuestion, parentID: number) {
  return {
    type: ADD_QUESTION,
    question,
    parentID
  }
}

export function addCategory(category: AppCategory, parentID: number) {
  return {
    type: ADD_CATEGORY,
    category,
    parentID
  }
}

export function showAddQuestionForm(categoryID: number) {
  return {
    type: SHOW_ADD_QUESTION,
    categoryID
  }
}
