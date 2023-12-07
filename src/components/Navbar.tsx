import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, type ReactNode } from 'react'
import { IconButton } from './IconButton'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import clsx from 'clsx'

export interface NavbarProps {
  actions?: ReactNode
}

export function Navbar ({ actions }: NavbarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  function open () {
    setIsExpanded(true)
  }

  function close () {
    setIsExpanded(false)
  }

  return (
    <nav className="fixed left-0 top-0 h-14 w-full border-b border-neutral-200">
      <div className="container flex h-full items-center justify-center px-4 sm:justify-between">
        <div className="absolute left-4 top-1/2 block -translate-y-1/2 sm:hidden">
          <IconButton onClick={open}>
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
        </div>

        <div className={clsx(
          'fixed left-0 top-0 flex h-full w-80 flex-col items-start gap-4 bg-neutral-200 p-6 shadow-lg transition-all sm:hidden',
          {
            '-translate-x-full': !isExpanded,
          }
        )}
        >
          <IconButton onClick={close}>
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
          <div onClick={close}>
            {actions}
          </div>
        </div>

        <h1 className="font-bold">
          <a href="#" className="hover:underline">
            Contact List
          </a>
        </h1>

        <div className="hidden sm:block">
          {actions}
        </div>
      </div>
    </nav>
  )
}
