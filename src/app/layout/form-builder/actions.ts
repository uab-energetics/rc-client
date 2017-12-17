import {Question} from "../../models/Question";
import {Category} from "../../models/Category";

const DEL_QUESTION = 'del_q';
const DEL_CATEGORY = 'del_c';
const MOVE_QUESTION = 'mv_q';
const MOVE_CATEGORY = 'mv_c';
const SELECT_CATEGORY = 'sel_c';
const ADD_QUESTION = 'add_q';
const ADD_CATEGORY = 'add_c';

function deleteQuestion(questionID: number){
  return {
    type: DEL_QUESTION,
    questionID
  }
}

function deleteCategory(categoryID: number){
  return {
    type: DEL_CATEGORY,
    categoryID
  }
}

function moveQuestion(questionID: number, categoryID: number){
  return {
    type: MOVE_QUESTION,
    questionID,
    categoryID
  }
}

function moveCategory(categoryID: number, parentID: number){
  return {
    type: MOVE_CATEGORY,
    categoryID,
    parentID
  }
}

function selectCategory(categoryID: number){
  return {
    type: SELECT_CATEGORY,
    categoryID
  }
}

function addQuestion(question: Question, parentID: number){
  return {
    type: ADD_QUESTION,
    question,
    parentID
  }
}

function addCategory(category: Category, parentID: number){
  return {
    type: ADD_CATEGORY,
    category,
    parentID
  }
}

export {
  DEL_CATEGORY, DEL_QUESTION, MOVE_CATEGORY, MOVE_QUESTION, SELECT_CATEGORY, ADD_QUESTION, ADD_CATEGORY,
  deleteCategory, deleteQuestion, moveCategory, moveQuestion, selectCategory, addQuestion, addCategory
};
