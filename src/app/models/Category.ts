
import {Question} from "./Question";

export interface Category {
  id?: number;
  name: string;
  description: string;
  children: Category[];
  questions: Question[];
}

export function makeCategory({
  id = 0,
  name = 'Default Category',
  description = ''
}, children: Category[] = [], questions: Question[] = []): Category {
  return {
    id,
    name,
    description,
    children,
    questions
  }
}
