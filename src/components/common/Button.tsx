import { FC, MouseEventHandler } from 'react'

type ButtonProps = {
  title?: string;

  onClick: MouseEventHandler;
}

export const PrimaryButton: FC<ButtonProps> = ({ onClick, title, children }) => {
  return (
    <button
      className={`px-3 py-0.5 text-indigo-600 border border-indigo-400 rounded transition-colors hover:bg-indigo-600 hover:text-white focus:ring focus:ring-offset-2`}
      title={title}
      onClick={onClick}>
      {children}
    </button>
  )
}

export const DangerButton: FC<ButtonProps> = ({ onClick, title, children }) => {
  return (
    <button
      className={`px-3 py-0.5 text-rose-600 border border-rose-400 rounded transition-colors hover:bg-rose-600 hover:text-white focus:ring focus:ring-offset-2`}
      title={title}
      onClick={onClick}>
      {children}
    </button>
  )
}
