import { useCallback, useState } from 'react'

type Callback =
  | (() => void)
  | (() => Promise<void>)

export function useRequestState () {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<any>()

  const clearError = useCallback(() => setError(undefined), [])

  const execute = useCallback(async (callback: Callback) => {
    setIsSubmitting(true)
    clearError()
    try {
      await callback()
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }, [clearError])

  return {
    execute,
    isSubmitting,
    error,
    clearError,
  }
}
