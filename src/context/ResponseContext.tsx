import React, { createContext, useContext } from 'react'
import { useResponse } from '../hooks'
import {
  ResponseProviderState,
  responseInitialState,
} from '../reducers'
import { Props } from '../utils/types'

// ready
const ResponseContext = createContext<ResponseProviderState>(
  responseInitialState
)

// not ready
export const ResponseContextProvider = ({ children }: Props) => {
  const responseProviderState = useResponse()

  return (
    <ResponseContext.Provider value={responseProviderState}>
      {children}
    </ResponseContext.Provider>
  )
}

// ready
export function useResponseContext() {
  return useContext(ResponseContext)
}
