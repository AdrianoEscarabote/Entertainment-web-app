export interface LoginUserParams {
  email: string
  password: string
}

export interface LoginUserReturn {
  id: string
  success: boolean
}

export interface ILoginUserRepository {
  loginUser(params: LoginUserParams): Promise<LoginUserReturn>
}
