import { AxiosError } from "axios";
import { err, Result } from "neverthrow";

export type AppError = {
  status: number;
  message: string;
};

export type AppResult<T> = Promise<Result<T, AppError>>;

export const extractApiError = (badError: any): Result<any, AppError> => {
  const error: AxiosError = badError;
  if (error.response) {
    if (typeof error.response.data === "object") {
      const apiError = error.response.data as AppError;
      return err(apiError);
    } else {
      const apiError: AppError = {
        status: error.response.status,
        message: error.response.statusText,
      };
      return err(apiError);
    }
  }

  const unknownError: AppError = {
    status: 500,
    message: "Unknown error",
  };

  console.warn("# Unknown error");
  console.warn(`# Code`, error.code);
  console.warn(`# Res`, error.response);
  console.warn(`# Msg`, error.message);

  return err(unknownError);
};
