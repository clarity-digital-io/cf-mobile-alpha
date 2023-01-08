import { Question__c, Form__c } from "../utils/types/sObjects"

export type FormProviderState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: Form__c | null,
  questions: Question__c[] // question id to answer
  error: any
  handleError: (message: any) => void
}

export const formInitialState: FormProviderState = {
  form: null,
  questions: [],
  error: null,
  handleError: (any) => void any
}

export type FormAction =
  | {
    type: 'INIT_FORM'
    form: FormProviderState['form']
    questions: FormProviderState['questions']
  }
  | {
    type: 'FORM_ERROR'
    error: FormProviderState['error']
  }
  | {
    type: 'RESET_FORM_PROVIDER'
  }

export function formReducer(
  state: FormProviderState,
  action: FormAction
): FormProviderState {
  switch (action.type) {
    case 'INIT_FORM':
      return { ...state, form: action.form, questions: action.questions }
    case 'RESET_FORM_PROVIDER':
      return formInitialState
    case 'FORM_ERROR':
    default:
      throw new Error()
  }
}
