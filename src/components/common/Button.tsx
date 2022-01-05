import { FC, MouseEventHandler } from 'react'

type ButtonProps = {
  onClick?: MouseEventHandler;
  className?: string;
}

const Button: FC<ButtonProps> = ({ onClick, className = '', children }) => {
  return (
    <button
      className={`px-4 py-1 text-sm text-blue-600 border border-blue-600 rounded transition-colors hover:bg-blue-600 hover:text-white focus:ring focus:ring-offset-2 ${className}`}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
