import { FC, MouseEventHandler } from 'react'

type ButtonProps = {
  title?: string;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler;
}

export const PrimaryButton: FC<ButtonProps> = ({ onClick, title, disabled, className, children }) => {
  return (
    <button
      className={`px-3 py-0.5 text-indigo-600 border border-indigo-400 rounded transition-colors hover:bg-indigo-600 hover:text-white focus:ring focus:ring-offset-2 ${className}`}
      title={title}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export const SecondaryButton: FC<ButtonProps> = ({ onClick, title, disabled, className, children }) => {
  return (
    <button
      className={`px-3 py-0.5 text-gray-300 rounded transition-colors hover:text-gray-800 hover:text-white focus:ring focus:ring-offset-2 ${className}`}
      title={title}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export const DangerButton: FC<ButtonProps> = ({ onClick, title, disabled, className, children }) => {
  return (
    <button
      className={`px-3 py-0.5 text-rose-600 border border-rose-400 rounded transition-colors hover:bg-rose-600 hover:text-white hover:disabled:bg-white disabled:border-rose-200 focus:ring focus:ring-offset-2 ${className}`}
      title={title}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
