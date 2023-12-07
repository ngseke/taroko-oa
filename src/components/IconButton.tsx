import { type ReactNode } from 'react'

export interface IconButtonProps {
  children?: ReactNode
  onClick?: () => void
}

export function IconButton ({ children, onClick }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center  rounded-full text-neutral-800 transition-all hover:bg-neutral-300 hover:shadow-sm"
    >
      {children}
    </button>
  )
}
