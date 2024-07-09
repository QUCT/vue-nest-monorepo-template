export interface CommonInterface {
  id: number;
  name: string;
  time: string;
}

export function commonFunction(): string {
  return "Hello from shared!55555555";
}

export interface ResponseData<T> {
  data: T;
  code: number;
  success: boolean;
  timestamp: string;
  method: string;
  path: string;
}
