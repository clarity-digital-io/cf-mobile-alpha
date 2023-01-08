import { mock } from "../../utils/mock"

export const useResponses = () => {
  if (process.env.NODE_ENV === 'development') {
    return { isSuccess: true, isLoading: false, data: mock.responses };
  }
}