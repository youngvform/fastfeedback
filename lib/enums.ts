export enum DBCollectionName {
  SITES = 'sites',
  USERS = 'users',
  FEEDBACK = 'feedback'
}

export enum FeedbackStatus {
  PENDING = 'pending'
}

export enum API {
  SITES = '/api/sites',
  FEEDBACK = '/api/feedback'
}

export enum ErrorCode {
  EXPIRED_TOKEN = 'auth/id-token-expired',
  UNAUTHORIZED = 'Unauthorized'
}
