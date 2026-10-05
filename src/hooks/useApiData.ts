import { useEffect, useState } from 'react'

type Status = 'loading' | 'success' | 'error'

// Tries the site's own /api endpoint first. If that isn't available (or doesn't return a
// JSON list), it falls back to fetching the data directly from the source in the browser.
export function useApiData<T>(endpoint: string, fallback?: () => Promise<T[]>) {
  const [data, setData] = useState<T[]>([])
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    const viaApi = async (): Promise<T[]> => {
      const res = await fetch(endpoint)
      if (!res.ok) throw new Error(`${res.status}`)
      const json = await res.json() // throws if the host returned the HTML app shell
      if (!Array.isArray(json)) throw new Error('bad payload')
      return json
    }

    viaApi()
      .catch(() => (fallback ? fallback() : Promise.reject(new Error('no fallback'))))
      .then((json) => {
        if (!cancelled) {
          setData(json)
          setStatus('success')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint])

  return { data, status }
}
