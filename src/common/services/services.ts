// This file is going to include all the services that we are going to use in our application

import { endpoints } from '../constants/urls'
import { httpClient } from './httpClient'
import type { Post } from '~/stores/types'

export const login = async (email: string, password: string) => {
  const response = await httpClient.post(endpoints.auth.login, {
    email,
    password,
  })
  return response.data
}

export const getPosts = async () => {
  const response = await httpClient.get<Post[]>(endpoints.posts)
  return response.data
}
