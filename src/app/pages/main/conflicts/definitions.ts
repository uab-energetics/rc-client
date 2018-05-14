import {AppExperimentEncoding} from '../../../core/encodings/AppExperimentEncoding'
import {AppQuestion} from '../../../core/form-questions/AppQuestion'
import {AppResponse} from '../../../core/form-responses/AppResponse'

export interface ConflictsResponse {
  groups: string[]
  other_encodings: AppExperimentEncoding[] // it has the whole user loaded, too.
  questions: AppQuestion[]
  conflicts: ConflictReport
  encoding: AppExperimentEncoding // the current user's encoding
}

export interface HashedEncodings {
  [encoding_id: number]: HashedEncoding
}

export interface HashedEncoding {
  id: number
  experiment_branches: {
    [branch_name: string]: HashedBranch
  }
}

export interface HashedBranch {
  id
  name: string
  responses: {
    [response_id: number]: AppResponse
  }
}

export interface ConflictReport {
  [branch_id: number]: {
    [question_id: number]: {
      [encoding_id: number]: ConflictRecord
    }
  }
}

export interface ConflictRecord {
  agrees: boolean
  message: string
  encoding_id: number
  other_encoding_id: number
  question_id: number
}
