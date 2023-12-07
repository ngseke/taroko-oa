import { type PropsWithChildren } from 'react'

export function Card (props: PropsWithChildren) {
  return (
    <div className="overflow-auto rounded-xl border border-neutral-300 bg-neutral-100 p-4" {...props} />
  )
}
