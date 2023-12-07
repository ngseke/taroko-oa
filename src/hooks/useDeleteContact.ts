import { useCallback, useState } from 'react'
import { removeContact } from '../modules/apis'

export function useDeleteContact () {
  const [isDeletingContacts, setIsDeletingContacts] = useState(false)

  const deleteContact = useCallback(async (id: number) => {
    setIsDeletingContacts(true)
    await removeContact(id)
    setIsDeletingContacts(false)
  }, [])

  return {
    isDeletingContacts,
    deleteContact,
  }
}
