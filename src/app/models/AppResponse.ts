
export interface Response {
  id?: number;
  question_id: number;
  type: string;
  txt?: string;
  num?: number;
  sel?: string;
}

interface TextPayload {
  txt: string;
}

interface NumberPayload {
  num: number;
}
