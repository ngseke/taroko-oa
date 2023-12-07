import clsx from 'clsx'
import { type ReactNode } from 'react'
import { LoadingIcon } from './LoadingIcon'

export interface ButtonProps {
  children?: ReactNode
  onClick?: () => void
  color?: 'default' | 'danger'
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
}

export function Button ({
  children,
  onClick,
  color = 'default',
  type = 'button',
  disabled,
  loading,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'inline-flex min-w-[6rem] items-center justify-center whitespace-nowrap rounded-xl px-4 py-1 text-sm font-medium uppercase transition-all enabled:hover:shadow-lg disabled:opacity-50',
        {
          'bg-neutral-300 text-neutral-800': color === 'default',
          'bg-rose-300 text-red-800': color === 'danger',
        }
      )}
      disabled={disabled}
    >
      {loading ? <LoadingIcon /> : children}
    </button>
  )
}
