import { QuestionTypes } from "./types/fields";
import { Form__c, Question_Criteria__c, Question__c, Response__c } from "./types/sObjects";

const MAX_FORMS = 20;
const MAX_QUESTIONS = 20;
const MAX_RESPONSES = 4;

type Mock = {
  forms: Form__c[]
  responses: Response__c[]
  questions: Question__c[]
  criteria: Question_Criteria__c[]
}

const types: Record<number, QuestionTypes> = Object.keys(QuestionTypes).reduce((accum, val, index) => {
  return { ...accum, [index]: val }
}, {})

const generate = (): Mock => {
  let _newForms: Form__c[] = [];
  let _newQuestions: Question__c[] = [];
  let _newQuestionCriteria: Question_Criteria__c[] = [];
  let _newResponses: Response__c[] = [];

  for (let index = 0; index < MAX_FORMS; index++) {
    const formId = index.toString();

    _newForms.push({
      Id: formId,
      Name: "Clarity Form",
      cforms__Status__c: "Published",
      cforms__Title__c: "Clarity Form" + '-' + index,
      cforms__Description__c: "Mock Form",
    } as Form__c)

    for (let index = 0; index < MAX_QUESTIONS; index++) {
      const questionId = formId + '-' + index.toString();

      _newQuestions.push({
        Id: questionId,
        cforms__Form__c: formId,
        cforms__Title__c: 'Title' + '-' + index.toString(),
        cforms__Order__c: index,
        cforms__Type__c: index,
        cforms__Category__c: 0,
        cforms__Page__c: 0 // Math.floor(index / 10),
      } as Question__c)

      // for (let index = 0; index < 1; index++) {
      //   _newQuestionCriteria.push({
      //     Id: questionId + '-' + index.toString(),
      //     cforms__Question__c: questionId, // question the criteria controls
      //     cforms__Field__c: string // q
      //     cforms__Field_Type__c: QuestionTypes
      //     cforms__Operator__c: OperatorTypes | string
      //     cforms__Type__c: string
      //     cforms__Value__c: string
      //   } as Question_Criteria__c)

      // }
    }

    // add a guide category question
    _newQuestions.push({
      Id: formId + _newQuestions.length,
      cforms__Form__c: formId,
      cforms__Title__c: 'Guide 1',
      cforms__Order__c: _newQuestions.length,
      cforms__Type__c: QuestionTypes.File,
      cforms__Category__c: 0,
      cforms__Page__c: 0 // Math.floor(index / 10),
    } as Question__c)

    for (let index = 0; index < MAX_RESPONSES; index++) {
      _newResponses.push({
        Id: formId + '-' + index.toString(),
        Name: "Clarity Form",
        cforms__Status__c: "Published",
        cforms__Form__c: formId,
      } as Response__c)
    }
  }
  return {
    forms: _newForms,
    questions: _newQuestions,
    responses: _newResponses
  };
}

export const mock = generate();

// used for local development 
// const forms: Form__c[] = generate(MAX_FORMS);

// const questions: Question__c[] = [];

// export const mock = {
//   forms,
//   questions
// }
