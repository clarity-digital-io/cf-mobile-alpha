import { QueryFunction } from "react-query";
import { mock } from "../../utils/mock"
import { Form__c, Question__c } from "../../utils/types/sObjects";

export const useForms = () => {
  if (process.env.NODE_ENV === 'development') {
    return { isSuccess: true, isLoading: false, data: mock.forms };
  }
}

export const getForm = (formId: string) => {
  if (process.env.NODE_ENV === 'development') {
  }

  return new Promise((resolve, reject) => setTimeout(() => {
    try {
      const form: Form__c | undefined = mock.forms.find((form: Form__c) => form.Id == formId)
      const questions: Question__c[] = mock.questions.filter((question: Question__c) => question.cforms__Form__c == formId)

      resolve({ form, questions })
    } catch (error) {
      reject(error)
    }

  }, 2000))
}