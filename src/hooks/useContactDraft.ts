import { useCallback, useState } from 'react'
import { type Contact, type ContactDraft } from '../types/Contact'

export function useContactDraft () {
  const [contactDraft, setContactDraft] =
    useState<ContactDraft | null>(null)

  const initiateContactDraft = useCallback((contact: Contact) => {
    const newDraft: ContactDraft = {
      firstName: contact.first_name,
      lastName: contact.last_name,
      job: contact.job,
      description: contact.description,
    }
    setContactDraft(newDraft)
  }, [])

  return {
    contactDraft,
    setContactDraft,
    initiateContactDraft,
  }
}
