import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { nanoid } from 'nanoid'
import { useState } from 'react'

export type ToastType = 'add' | 'edit' | 'delete'

export interface Toast {
  id: string
  type: ToastType
}

export function useToast () {
  const [toasts, setToasts] = useState<Set<Toast>>(new Set())

  function pushToast (type: ToastType) {
    const toast = { id: nanoid(), type }

    setToasts(toasts => {
      const newToasts = new Set(toasts)
      newToasts.add(toast)
      return newToasts
    })

    setTimeout(() => {
      setToasts(toasts => {
        const newToasts = new Set(toasts)
        newToasts.delete(toast)
        return newToasts
      })
    }, 3000)
  }

  return {
    toasts,
    pushToast,
  }
}

export interface ToastsProps {
  toasts: Set<Toast>
}

function getToastMessage (type: ToastType) {
  return {
    add: 'Successfully Added!',
    edit: 'Successfully Edited!',
    delete: 'Successfully Deleted!',
  }[type]
}

export function Toasts ({ toasts }: ToastsProps) {
  return (
    <div className="fixed bottom-0 right-0 flex max-w-full flex-col items-end gap-2 p-4">
      {[...toasts].map(({ id, type }) => (
        <div
          key={id}
          className="flex gap-2 rounded-xl bg-lime-600 px-4 py-2 text-lime-100 shadow-md"
        >
          <FontAwesomeIcon icon={faCheck} className="mt-1" />
          {getToastMessage(type)}
        </div>
      ))}
    </div>
  )
}
