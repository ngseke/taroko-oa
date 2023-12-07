import { useCallback, useState } from 'react'

type Callback =
  | (() => void)
  | (() => Promise<void>)

export function useRequestState () {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<any>()

  const execute = useCallback(async (callback: Callback) => {
    setIsSubmitting(true)
    try {
      await callback()
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const clearError = useCallback(() => setError(undefined), [])

  return {
    execute,
    isSubmitting,
    error,
    clearError,
  }
}
