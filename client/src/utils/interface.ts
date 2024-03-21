import { ChangeEvent, FormEvent } from 'react'

export type FormChanged = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

export type FormSubmitted = FormEvent<HTMLFormElement>

export interface GlobalStoreState {
  alertState: IAlertState
  userState: IUserState
}

export interface IGeneralField {
  createdAt: string
  _id: string
}

export interface IAlertState {
  message: string
  type: string
}

export interface IUserState {
  data: Partial<ILoginResponse>
  loading: boolean
}

export interface IUser extends IGeneralField {
  name: string
  username: string
  email: string
  description: string
  avatar: string
  private: boolean
}

export interface ILoginResponse {
  user: IUser
  accessToken: string
}