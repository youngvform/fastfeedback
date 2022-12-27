import { ErrorCode } from '@/lib/enums'

export default async function fetcher(url, accessToken) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
      })
      // credentials: 'same-origin' // 디폴트가 same-origin(같은 origin일 때만 credentials을 같이 보냄)
    })

    if (!res.ok) {
      const data = await res.json()
      throw new FetchError(res, data.error)
    }
    return res.json()
  } catch (e) {
    const error = e.info
    // 파이어베이스가 아니었다면 여기서 token refresh 처리
    if (error.code === ErrorCode.EXPIRED_TOKEN) {
    }

    throw error
  }
}

class FetchError extends Error {
  constructor(public res: Response, public info) {
    super(`An error occurred while fetching with status ${res.status}`)
  }
}
