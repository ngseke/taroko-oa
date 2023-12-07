import { type Contact } from '../types/Contact'
import { fetchContacts } from '../modules/apis'
import useSWR from 'swr'

export function useContacts () {
  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<Contact[]>('contacts', fetchContacts, {})

  return {
    contacts: data,
    contactsError: error,
    isLoadingContacts: isLoading || isValidating,
    mutateContacts: mutate,
  }
}
