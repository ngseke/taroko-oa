import { type ReactNode, useEffect, useRef } from 'react'
import { Card } from './Card'

export interface DialogProps {
  open?: boolean
  title?: ReactNode
  children?: ReactNode

  onClose: () => void
}

export function Dialog ({ open, title, children, onClose }: DialogProps) {
  const ref = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (open) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      className="w-[30rem] max-w-full overflow-visible bg-transparent p-0 backdrop:bg-neutral-900/70 backdrop:backdrop-blur-[1px]"
      onClose={onClose}
    >
      <div className="px-2">
        <Card>
          <h2 className="mb-4 text-xl font-bold">{title}</h2>
          {children}
        </Card>
      </div>
    </dialog>
  )
}
