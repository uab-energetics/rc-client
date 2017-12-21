
export interface AppResponse {
  id?: number;
  question_id: number;
  type: string;
  txt?: string;
  num?: number;
  sel?: string;
  boo?: string;
  'multi-sel'?: TextPayload[];
}

export interface TextPayload {
  txt: string;
}
