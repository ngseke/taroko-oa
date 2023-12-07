import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type PropsWithChildren } from 'react'

export function ErrorMessage ({ children }: PropsWithChildren) {
  return (
    <div className="mb-4 flex gap-2 text-sm font-medium text-red-500">
      <FontAwesomeIcon className="mt-[3px]" icon={faTriangleExclamation} />
      {children}
    </div>
  )
}
