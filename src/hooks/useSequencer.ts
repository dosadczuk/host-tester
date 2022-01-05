import { useState } from 'react'

type CurrValue = number;
type NextValue = () => number;

const useSequencer = (initialValue = 1): [CurrValue, NextValue] => {
  const [value, setValue] = useState<CurrValue>(initialValue)

  const nextId: NextValue = () => {
    const newId = value + 1
    setValue(newId)
    return newId
  }

  return [value, nextId]
}

export default useSequencer
