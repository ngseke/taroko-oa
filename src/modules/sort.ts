import { type Contact } from '../types/Contact'

export type SortOrder = 'asc' | 'desc'

export function sortContacts (contacts: Contact[], order: SortOrder) {
  return [...contacts]
    .sort((a, b) => {
      const aName = `${a.first_name} ${a.last_name}`
      const bName = `${b.first_name} ${b.last_name}`

      return (order === 'asc')
        ? aName.localeCompare(bName)
        : bName.localeCompare(aName)
    })
}
