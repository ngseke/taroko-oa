import { useCallback } from 'react'
import { removeContact } from '../modules/apis'
import { useRequestState } from './useRequestState'

export function useDeleteContact () {
  const { execute, isSubmitting, error, clearError } = useRequestState()

  const deleteContact = useCallback(async (id: number) => {
    await execute(async () => {
      await removeContact(id)
    })
  }, [execute])

  return {
    isDeletingContacts: isSubmitting,
    deleteContact,
    deleteContactError: error,
    clearDeleteContactError: clearError,
  }
}
