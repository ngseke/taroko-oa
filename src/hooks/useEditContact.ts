import { type ContactDraft } from '../types/Contact'
import { updateContact } from '../modules/apis'
import { useRequestState } from './useRequestState'

export function useEditContact () {
  const { execute, isSubmitting, error, clearError } = useRequestState()

  async function submit (id: number | null, draft: ContactDraft) {
    await execute(async () => {
      if (!id) throw new Error('Missing `contactId`!')
      await updateContact(id, draft)
    })
  }

  return {
    submit,
    isSubmitting,
    submitError: error,
    clearSubmitError: clearError,
  }
}
