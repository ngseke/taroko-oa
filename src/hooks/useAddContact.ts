import { type ContactDraft } from '../types/Contact'
import { createContact } from '../modules/apis'
import { useState } from 'react'

export function useAddContact () {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function submit (draft: ContactDraft) {
    setIsSubmitting(true)

    await createContact(draft)

    setIsSubmitting(false)
  }

  return {
    submit,
    isSubmitting,
  }
}
