
import {AppQuestion} from "../form-questions/AppQuestion";

export interface AppCategory {
  id?: number;
  name: string;
  description: string;
  children: AppCategory[];
  questions: AppQuestion[];
}

export function makeCategory({
  id = 0,
  name = 'Default Category',
  description = ''
}, children: AppCategory[] = [], questions: AppQuestion[] = []): AppCategory {
  return {
    id,
    name,
    description,
    children,
    questions
  }
}
