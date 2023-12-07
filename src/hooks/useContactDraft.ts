import { useCallback, useState } from 'react'
import { type Contact, type ContactDraft } from '../types/Contact'

const generateDefaultDraft = (): ContactDraft => ({
  firstName: '',
  lastName: '',
  job: '',
  description: '',
})

export function useContactDraft () {
  const [contactDraft, setContactDraft] =
    useState<ContactDraft>(generateDefaultDraft())

  const initiateContactDraft = useCallback((contact: Contact) => {
    const newDraft: ContactDraft = {
      firstName: contact.first_name,
      lastName: contact.last_name,
      job: contact.job,
      description: contact.description,
    }
    setContactDraft(newDraft)
  }, [])

  const resetContactDraft = useCallback(() => {
    setContactDraft(generateDefaultDraft())
  }, [])

  return {
    contactDraft,
    setContactDraft,
    initiateContactDraft,
    resetContactDraft,
  }
}
