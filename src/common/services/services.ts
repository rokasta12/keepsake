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

export const makePost = async (req: any) => {
  const response = await httpClient.post(endpoints.posts, req)

  return { data: response.data, status: response.status }
}

export const getAccountDetails = async () => {
  const response = await httpClient.get(endpoints.auth.accountDetails)

  return response.data
}

export const editAccountDetails = async (data: any) => {
  const response = await httpClient.put(endpoints.auth.accountDetails, data)

  return response.data
}

export const getFamilies = async () => {
  const response = await httpClient.get(endpoints.families.myFamilies)
  return response.data
}

export const createFamily = async (familyName: string) => {
  const response = await httpClient.post(endpoints.families.families, { name: familyName })
  return response.data
}

export const joinFamily = async (code: string) => {
  const response = await httpClient.get('http://localhost:3002/families/join-family' + `/${code}`)
  return response.data
}

export const services = {
  signup, verifyEmail, login, makePost, getAccountDetails, getPosts, editAccountDetails, getFamilies, createFamily, joinFamily,
}
