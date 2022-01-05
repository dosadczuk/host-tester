import { FC, MouseEventHandler } from 'react'

type ButtonProps = {
  onClick?: MouseEventHandler;
  className?: string;
}

const Button: FC<ButtonProps> = ({ onClick, className = '', children }) => {
  return (
    <button className={`px-4 py-0.5 text-sm text-medium rounded focus:ring focus:ring-offset-2 ${className}`}
            onClick={onClick}>
      {children}
    </button>
  )
}

export const PrimaryButton: FC<ButtonProps> = ({ onClick, className = '', children }) => {
  return (
    <Button className={`bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-200 ${className}`}
            onClick={onClick}>
      {children}
    </Button>
  )
}

export default Button
