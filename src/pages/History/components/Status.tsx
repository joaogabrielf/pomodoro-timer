import { ReactNode } from 'react'

const STATUS_COLORS = {
  yellow: 'before:bg-yellow-500',
  green: 'before:bg-green-500',
  red: 'before:bg-red-500',
}

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
  children: ReactNode
}

export function Status({ statusColor, children }: StatusProps) {
  return (
    <span
      className={`flex items-center gap-2 before:h-2 before:w-2 before:rounded-full before:content-[''] ${STATUS_COLORS[statusColor]}`}
    >
      {children}
    </span>
  )
}
