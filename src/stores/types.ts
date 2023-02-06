export interface Family {
  _id: string
  name: string
  createdDate: string
  adminUser: any
  feed: any[]
  members: Member[]
  code: string
  isAvailibleForNewMembers: boolean
  __v: number
}

export interface Member {
  _id: string
  firstName: string
  lastName: string
  password: string
  email: string
  profilePicUrl: string
  familyId: string[]
  __v: number
}

export interface Post {
  _id: string
  audioUrl: string
  description: string
  date: string
  postedBy: PostedBy | null
  familyId: FamilyId[]
  comments: any[]
  __v: number
}

export interface FamilyId {
  _id: string
  familyName: string
  createdDate: string
  adminUser: string
  feed: any[]
  members: string[]
  __v: number
}
export interface PostedBy {
  _id: string
  firstName: string
  lastName: string
  password: string
  email: string
  profilePicUrl: string
  familyId: string[]
  __v: number
}

export interface SignupData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface User {
  firstName: string
  lastName: string
  email: string
  familyId: any[]
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
  profilePicUrl: string
}
export interface VerifyEmailData {
  otp: string
  email: string
}
