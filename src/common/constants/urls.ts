export const baseURL = 'http://localhost:3002'
export const prodURL = 'https://api.jelylabs.com/proxy'

export const endpoints = {
  auth: {
    login: '/v1/auth/login',
    register: '/v1/auth/register',
    logout: '/v1/auth/logout',
    verify: '/v1/auth/verify-email',
    accountDetails: '/v1/auth/me',
  },
  posts: '/posts',
}
