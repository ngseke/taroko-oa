import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { extractErrorMessage } from '../modules/extractErrorMessage'

export interface ErrorMessageProps {
  error: unknown
}

export function ErrorMessage ({ error }: ErrorMessageProps) {
  if (!error) return <></>

  return (
    <div className="mb-4 flex gap-2 text-sm font-medium text-red-500">
      <FontAwesomeIcon className="mt-[3px]" icon={faTriangleExclamation} />
      {extractErrorMessage(error)}
    </div>
  )
}
