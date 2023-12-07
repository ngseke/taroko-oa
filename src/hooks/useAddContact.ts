import { type ContactDraft } from '../types/Contact'
import { createContact } from '../modules/apis'
import { useRequestState } from './useRequestState'

export function useAddContact () {
  const { execute, isSubmitting, error, clearError } = useRequestState()

  async function submit (draft: ContactDraft) {
    await execute(async () => {
      await createContact(draft)
    })
  }

  return {
    submit,
    isSubmitting,
    submitError: error,
    clearSubmitError: clearError,
  }
}
