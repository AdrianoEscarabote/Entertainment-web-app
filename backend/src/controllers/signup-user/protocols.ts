export interface RegisterUserParams {
  email: string
  confirmpassword: string
  password: string
}

export interface RegisterUserReturn {
  id: string
}

export interface ISignupUserRepository {
  registerUser(params: RegisterUserParams): Promise<RegisterUserReturn>
}
