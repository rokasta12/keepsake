// This file is going to include all the services that we are going to use in our application

import { endpoints } from '../constants/urls'
import { httpClient } from './httpClient'
import type { Post, SignupData, VerifyEmailData } from '~/stores/types'
import type { LoginResponse } from '~/stores/response.type'

export const login = async (email: string, password: string) => {
  const response = await httpClient.post<LoginResponse>(endpoints.auth.login, {
    email,
    password,
  })
  return { data: response.data, status: response.status }
}

export const getPosts = async () => {
  const response = await httpClient.get<Post[]>(endpoints.posts)
  return response.data
}

export const signup = async (signupData: SignupData) => {
  const response = await httpClient.post(endpoints.auth.register, signupData)

  return { data: response.data, status: response.status }
}

export const verifyEmail = async (verifData: VerifyEmailData) => {
  const response = await httpClient.post(endpoints.auth.verify, verifData)

  return { data: response.data, status: response.status }
}

export const services = {
  signup, verifyEmail, login,
}
