import { type Contact } from '../types/Contact'
import { fetchContacts } from '../modules/apis'
import useSWR from 'swr'
import { useCallback, useMemo, useState } from 'react'
import { type SortOrder, sortContacts } from '../modules/sort'

export function useContacts () {
  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<Contact[]>('contacts', fetchContacts, {})

  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const toggleSortOrder = useCallback(() => {
    setSortOrder((order) => order === 'asc' ? 'desc' : 'asc')
  }, [])

  const sortedContacts = useMemo(() => (
    data ? sortContacts(data, sortOrder) : data
  ), [data, sortOrder])

  return {
    contacts: data,
    sortedContacts,
    sortOrder,
    setSortOrder,
    toggleSortOrder,
    contactsError: error,
    isLoadingContacts: isLoading || isValidating,
    mutateContacts: mutate,
  }
}
