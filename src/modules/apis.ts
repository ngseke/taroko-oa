import baseAxios from 'axios'
import { type Contact, type ContactDraft } from '../types/Contact'

const axios = baseAxios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

function convertContactDraftToRequestBody (
  draft: ContactDraft
): Omit<Contact, 'id'> {
  return {
    first_name: draft.firstName,
    last_name: draft.lastName,
    job: draft.job,
    description: draft.description,
  }
}

export async function fetchContacts () {
  const { data } = await axios.get('/api/contacts')

  return data.data as Contact[]
}

export async function fetchContact (id: number) {
  const { data } = await axios.get(`/api/contacts/${id}`)

  return data.data as Contact
}

export async function createContact (contact: ContactDraft) {
  const body: { contact: Omit<Contact, 'id'> } = {
    contact: convertContactDraftToRequestBody(contact),
  }
  await axios.post('/api/contacts', body)
}

export async function updateContact (id: number, contact: ContactDraft) {
  const body: { info: Omit<Contact, 'id'> } = {
    info: convertContactDraftToRequestBody(contact),
  }
  await axios.patch(`/api/contacts/${id}`, body)
}

export async function removeContact (id: number) {
  await axios.delete(`/api/contacts/${id}`)
}
