import { type ContactDraft } from '../types/Contact'
import { createContact } from '../modules/apis'
import { useState } from 'react'

export function useAddContact () {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function submit (draft: ContactDraft) {
    setIsSubmitting(true)
    try {
      await createContact(draft)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    submit,
    isSubmitting,
  }
}
