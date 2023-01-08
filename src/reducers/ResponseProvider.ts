import { Answer__c, Response__c } from "../utils/types/sObjects"

export type ResponseProviderState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: Response__c | null,
  answers: Record<string, Answer__c> // question id to answer
  setResponse: (response: any) => void
  handleError: (message: any) => void
}


export const responseInitialState: ResponseProviderState = {
  response: null,
  answers: {},
  setResponse: (any) => void any,
  handleError: (any) => void any
}

export type ResponseAction =
  | {
    type: 'INIT_RESPONSE'
    response: ResponseProviderState['response']
  }
  | {
    type: 'SET_ANSWERS'
    answers: ResponseProviderState['answers']
  }
  | {
    type: 'RESET_RESPONSE_PROVIDER'
  }

export function responseReducer(
  state: ResponseProviderState,
  action: ResponseAction
): ResponseProviderState {
  switch (action.type) {
    case 'INIT_RESPONSE':
      return { ...state, response: action.response }
    case 'SET_ANSWERS':
      return { ...state, answers: action.answers }
    case 'RESET_RESPONSE_PROVIDER':
      return responseInitialState
    default:
      throw new Error()
  }
}
