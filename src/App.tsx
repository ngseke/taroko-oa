import { useState } from 'react'
import { Button } from './components/Button'

import { EditContactDialog } from './components/EditContactDialog'
import { Navbar } from './components/Navbar'
import { useContacts } from './hooks/useContacts'
import { ContactCards } from './components/ContactCards'
import { LoadingIcon } from './components/LoadingIcon'
import { useDeleteContact } from './hooks/useDeleteContact'
import clsx from 'clsx'
import { AddContactDialog } from './components/AddContactDialog'

export default function App () {
  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false)
  function openAddDialog () {
    setIsAddDialogOpened(true)
  }
  function closeAddDialog () {
    setIsAddDialogOpened(false)
  }

  const [activeContactId, setActiveContactId] = useState<number | null>(null)

  const { contacts, isLoadingContacts, mutateContacts } = useContacts()

  const { deleteContact, isDeletingContacts } = useDeleteContact()

  async function handleClickDelete (id: number) {
    await deleteContact(id)
    await mutateContacts()
  }

  return (
    <div className="container my-6 px-4 pt-14">
      <Navbar
        actions={<Button onClick={openAddDialog}>Add Contact</Button>}
      />

      <main
        className={clsx(
          'flex flex-col items-center gap-6',
          {
            'opacity-50': isLoadingContacts || isDeletingContacts,
          }
        )}
      >
        <h2 className="text-center text-3xl font-bold">Contacts</h2>

        {
          (contacts)
            ? <ContactCards
                contacts={contacts}
                onClickEdit={setActiveContactId}
                onClickDelete={handleClickDelete}
              />
            : <span><LoadingIcon /></span>
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
