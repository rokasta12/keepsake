export interface Family {
  _id: string
  familyName: string
  createdDate: string
  adminUser: any
  feed: any[]
  members: Member[]
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
