export interface ChecktokenParams {
  id: string
  token: string
}

export interface ChecktokenReturn {
  success: boolean
}

export interface IChecktokenRepository {
  checkToken(params: ChecktokenParams): Promise<ChecktokenReturn>
}
