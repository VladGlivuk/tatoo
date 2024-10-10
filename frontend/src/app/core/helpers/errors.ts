//types
import { ErrorStatus } from '../types';

export const getErrors = (errorsData: ErrorStatus, codeValue: string): Array<string> => {
  const codeResult: string = errorsData[codeValue];
  return codeResult?.split(' ');
};

export const getFirstChapter = (errors: Array<string>) => errors.slice(0, errors.length - 1).join(' ');

export const getSecondChapter = (errors: Array<string>) => errors[errors.length - 1];
