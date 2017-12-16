export interface QuestionOption {
  txt: string;
}

export interface QuestionResponseType {
  type: string;
}

export interface Question {
  id?: number;
  name: string;
  prompt: string;
  description: string;
  options: QuestionOption[];
  accepts: QuestionResponseType[];
  default_format: string;
  true_option: string;
  false_option: string;
}

export function makeQuestion ({
  id = 0,
  name = 'default name',
  prompt = 'default prompt',
  description = '',
  default_format = 'txt',
  true_option = 'Yes',
  false_option = 'No'
}, options: QuestionOption[] = [], accepts: QuestionResponseType[] = []): Question {
  return {
    id,
    name,
    prompt,
    description,
    options,
    accepts,
    default_format,
    true_option,
    false_option
  }
}
