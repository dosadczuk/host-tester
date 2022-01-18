import { useEffect, useState } from 'react'

const useLocalStorage = (name: string, defaultValue: string = '') => {
  const [ value, setValue ] = useState('')

  useEffect(
    () => {
      const savedValue = localStorage.getItem(name)
      if (savedValue == null) {
        localStorage.setItem(name, defaultValue)
      }

      setValue(savedValue ?? defaultValue)
    },
    [],
  )

  return value
}

export default useLocalStorage
