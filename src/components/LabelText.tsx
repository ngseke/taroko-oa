import { type PropsWithChildren } from 'react'

export function LabelText (props: PropsWithChildren) {
  return (
    <span className="text-sm font-medium text-neutral-600" {...props} />
  )
}
