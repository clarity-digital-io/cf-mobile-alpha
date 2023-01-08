import { useReducer } from 'react'
import { useQuery } from 'react-query';
import { getForm } from '../queries/myForms';

import {
  FormProviderState,
  FormAction,
  formInitialState,
  formReducer,
} from '../reducers'
import { Form__c, Question__c } from '../utils/types/sObjects';

export const useForm = (formId: string) => {
  const [state, dispatch] = useReducer(
    formReducer,
    formInitialState
  );
  const { form, questions, error } = state;

  // init form
  const { isLoading, isError } = useQuery(
    ['init-form', formId],
    () => getForm(formId),
    {
      onSuccess: ({ form, questions }: { form: Form__c, questions: Question__c[] }) => {

        dispatch({
          type: 'INIT_FORM',
          form: form,
          questions: questions
        })
      },
      onError: (data) => {

      }
    }
  )

  // for new forms no answers yet 
  // need to be able to set answers though 

  const handleError = (error: any) => {
    dispatch({
      type: 'FORM_ERROR',
      error: error
    })
  }

  return {
    form,
    questions,
    error,
    handleError
  } as FormProviderState
}
