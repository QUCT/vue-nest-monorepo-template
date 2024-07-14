export interface LoginRequestData {
  /** admin 或 editor */
  name?: 'admin' | 'editor'
  /** 密码 */
  password: string
  /** 验证码 */
  code: string
  /** 验证码id */
  captchaKey: string
}

export type LoginCodeResponseData = ApiResponseData<{
  img: string
  captchaKey: string
}>

export type LoginResponseData = ApiResponseData<{ token: string }>

export type UserInfoResponseData = ApiResponseData<{ name: string; roles: string[] }>
