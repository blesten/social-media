import { ChangeEvent, FormEvent } from 'react'

export type FormChanged = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

export type FormSubmitted = FormEvent<HTMLFormElement>

export interface GlobalStoreState {
  alertState: IAlertState
  userState: IUserState
  homeState: IHomeState
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
  followings: IFollow[]
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

export interface IFollow {
  user: IUser
  status: number
}

export interface IHomeState {
  posts: IPost[]
  loading: boolean
}

export interface IPost extends IGeneralField {
  user: IUser
  caption: string
  images: string[]
  likes: string[]
  comments: string[]
}

export interface IComment extends IGeneralField {
  user: IUser
  post: string
  content: string
  likes: string[]
}

export interface INotification extends IGeneralField {
  user: string
  avatar: string
  username: string
  message: string
  read: number
}