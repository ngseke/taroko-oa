import { useState } from 'react'
import { Button } from './components/Button'

import { EditContactDialog } from './components/EditContactDialog'
import { Navbar } from './components/Navbar'
import { useContacts } from './hooks/useContacts'
import { ContactCards } from './components/ContactCards'
import { useDeleteContact } from './hooks/useDeleteContact'
import { AddContactDialog } from './components/AddContactDialog'
import { ErrorMessage } from './components/ErrorMessage'

export default function App () {
  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false)
  function openAddDialog () {
    setIsAddDialogOpened(true)
  }
  function closeAddDialog () {
    setIsAddDialogOpened(false)
  }

  const [activeContactId, setActiveContactId] = useState<number | null>(null)

  const { contacts, isLoadingContacts, contactsError, mutateContacts } = useContacts()

  const { deleteContact, isDeletingContacts, deleteContactError } = useDeleteContact()

  async function handleClickDelete (id: number) {
    await deleteContact(id)
    await mutateContacts()
  }

  return (
    <div className="container my-6 px-4 pt-14">
      <Navbar
        actions={<Button onClick={openAddDialog}>Add Contact</Button>}
      />

      <main className="flex flex-col items-center gap-6">
        <h2 className="text-center text-3xl font-bold">Contacts</h2>
        {<ErrorMessage error={contactsError} />}
        {<ErrorMessage error={deleteContactError} />}
        {
          contacts && !contactsError &&
            <ContactCards
              contacts={contacts}
              disabled={isLoadingContacts || isDeletingContacts}
              onClickEdit={setActiveContactId}
              onClickDelete={handleClickDelete}
            />
        }
      </main>

      <EditContactDialog
        contactId={activeContactId}
        onClose={() => setActiveContactId(null)}
        onSuccess={mutateContacts}
      />
      <AddContactDialog
        open={isAddDialogOpened}
        onClose={closeAddDialog}
        onSuccess={mutateContacts}
      />
    </div>
  )
}
