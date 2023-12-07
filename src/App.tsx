import { useState } from 'react'
import { Button } from './components/Button'

import { EditContactDialog } from './components/EditContactDialog'
import { Navbar } from './components/Navbar'
import { useContacts } from './hooks/useContacts'
import { ContactCards } from './components/ContactCards'
import { useDeleteContact } from './hooks/useDeleteContact'
import { AddContactDialog } from './components/AddContactDialog'
import { ErrorMessage } from './components/ErrorMessage'
import { SortIconButton } from './components/SortIconButton'
import { type ToastType, Toasts, useToast } from './components/Toasts'

export default function App () {
  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false)
  function openAddDialog () {
    setIsAddDialogOpened(true)
  }
  function closeAddDialog () {
    setIsAddDialogOpened(false)
  }

  const [activeContactId, setActiveContactId] = useState<number | null>(null)

  const { sortedContacts, sortOrder, toggleSortOrder, isLoadingContacts, contactsError, mutateContacts } = useContacts()

  const { deleteContact, isDeletingContacts, deleteContactError } = useDeleteContact()

  async function handleClickDelete (id: number) {
    await deleteContact(id)
    handleSuccess('delete')()
  }

  const { toasts, pushToast } = useToast()

  function handleSuccess (type: ToastType) {
    return function () {
      pushToast(type)
      mutateContacts()
    }
  }

  return (
    <div className="container my-6 max-w-[1000px] px-4 pt-14">
      <Navbar
        actions={<Button onClick={openAddDialog}>Add Contact</Button>}
      />

      <main className="flex flex-col items-center gap-6">
        <div className="relative flex w-full justify-center gap-2">
          <h2 className="text-center text-3xl font-bold">Contacts</h2>
          <div className="sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2">
            <SortIconButton
              sortOrder={sortOrder}
              onClick={toggleSortOrder}
            />
          </div>
        </div>
        {<ErrorMessage error={contactsError} />}
        {<ErrorMessage error={deleteContactError} />}
        {
          sortedContacts && !contactsError &&
            <ContactCards
              contacts={sortedContacts}
              disabled={isLoadingContacts || isDeletingContacts}
              onClickEdit={setActiveContactId}
              onClickDelete={handleClickDelete}
            />
        }
      </main>

      <EditContactDialog
        contactId={activeContactId}
        onClose={() => setActiveContactId(null)}
        onSuccess={handleSuccess('edit')}
      />
      <AddContactDialog
        open={isAddDialogOpened}
        onClose={closeAddDialog}
        onSuccess={handleSuccess('add')}
      />

      <Toasts toasts={toasts} />
    </div>
  )
}
