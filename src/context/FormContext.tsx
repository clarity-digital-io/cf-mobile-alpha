import React, { createContext, useContext } from 'react'
import { useForm } from '../hooks'
import {
  FormProviderState,
  formInitialState,
} from '../reducers'
import { FormProps } from '../utils/types'

// ready
const FormContext = createContext<FormProviderState>(
  formInitialState
)

// not ready
export const FormContextProvider = ({ children, formId }: FormProps) => {
  const formProviderState = useForm(formId)

  return (
    <FormContext.Provider value={formProviderState}>
      {children}
    </FormContext.Provider>
  )
}

// ready
export function useFormContext() {
  return useContext(FormContext)
}
