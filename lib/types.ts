import { ReactNode } from 'react'
import { FeedbackStatus } from './enums'

export interface ChildrenProps {
  children: ReactNode
}

export interface UserState {
  uid: string
  email: string | null
  name: string | null
  provider: string
  photoUrl: string | null
  accessToken: string | null
}

export interface SiteData {
  name: string
  url: string
  authorId: string
  createdAt: string
}

export interface Feedback {
  author: string
  authorId: string
  createdAt: string
  provider: string
  rating?: number
  siteId: string
  status: FeedbackStatus
  text: string
}

export interface SavedSiteData extends SiteData {
  id: string
}

export interface SavedFeedback extends Feedback {
  id: string
}

export interface GetSitesResponse {
  sites: SavedSiteData[]
}

export interface GetFeedbackResponse {
  feedback: SavedFeedback[]
}
