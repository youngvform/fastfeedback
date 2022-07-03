import { ReactNode } from 'react'

export interface ChildrenProps {
  children: ReactNode
}

export interface UserState {
  uid: string
  email: string | null
  name: string | null
  provider: string
  photoUrl: string | null
}

export interface SiteData {
  site: string
  url: string
}
