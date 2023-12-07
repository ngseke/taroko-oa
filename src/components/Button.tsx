import clsx from 'clsx'
import { type ReactNode } from 'react'

export interface ButtonProps {
  children?: ReactNode
  onClick?: () => void
  color?: 'default' | 'danger'
  type?: 'button' | 'submit'
}

export function Button ({
  children,
  onClick,
  color = 'default',
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'inline-flex min-w-[6rem] justify-center rounded-xl px-4 py-1 text-sm font-medium uppercase transition-all hover:shadow-lg',
        {
          'bg-neutral-300 text-neutral-800': color === 'default',
          'bg-rose-300 text-red-800': color === 'danger',
        }
      )}
    >
      {children}
    </button>
  )
}
