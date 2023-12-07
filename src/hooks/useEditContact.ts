import { type ContactDraft } from '../types/Contact'
import { updateContact } from '../modules/apis'
import { useState } from 'react'

export function useEditContact () {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function submit (id: number, draft: ContactDraft) {
    setIsSubmitting(true)

    await updateContact(id, draft)

    setIsSubmitting(false)
  }

  return {
    submit,
    isSubmitting,
  }
}
