import { useCallback, useEffect, useReducer } from 'react'
import { call } from '../query';

import {
  ResponseProviderState,
  ResponseAction,
  responseInitialState,
  responseReducer,
} from '../reducers'
import { Response__c } from '../utils/types/sObjects';

export const useResponse = () => {
  const [state, dispatch] = useReducer(
    responseReducer,
    responseInitialState
  );

  const { answers, response } = state;

  const setResponse = (_response: Response__c) => {
    dispatch({
      type: 'INIT_RESPONSE',
      response: _response
    } as ResponseAction)
  }

  // const setAnswers

  return {
    answers,
    response,
    setResponse
  } as ResponseProviderState
}
