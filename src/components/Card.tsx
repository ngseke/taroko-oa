import { type PropsWithChildren } from 'react'

export function Card (props: PropsWithChildren) {
  return (
    <div className="rounded-xl border border-neutral-300 p-4" {...props} />
  )
}
