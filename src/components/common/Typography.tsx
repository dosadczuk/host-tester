import { FC } from 'react'

export const Heading1: FC = ({ children }) => {
  return (
    <span className="text-4xl font-black">
      {children}
    </span>
  )
}

export const Heading2: FC = ({ children }) => {
  return (
    <span className="text-2xl font-bold uppercase">
      {children}
    </span>
  )
}

export const Heading3: FC = ({ children }) => {
  return (
    <span className="text-xl text-gray-600 font-medium">
      {children}
    </span>
  )
}

export const Caption: FC = ({ children }) => {
  return (
    <span className="text-sm text-gray-400 font-normal leading-none">
      {children}
    </span>
  )
}

