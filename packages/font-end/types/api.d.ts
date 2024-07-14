/** 所有 api 接口的响应数据都应该准守该格式 */
interface ApiResponseData<T> {
  token(token: any): unknown
  code: number
  data: T
  message: string
  [string]: any
}
