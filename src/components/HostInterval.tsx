import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline'
import { FC, Fragment, useEffect, useState } from 'react'

type Props = {
  onChange: (interval: number) => void;
}

const intervals = [
  { value: 1_000, title: '1 s' },
  { value: 5_000, title: '5 s' },
  { value: 10_000, title: '10 s' },
  { value: 60_000, title: '1 min' },
  { value: 600_000, title: '10 min' },
]

const HostInterval: FC<Props> = ({ onChange }) => {
  const [interval, setInterval] = useState(intervals[2])

  useEffect(() => onChange(interval.value), [onChange, interval])

  return (
    <Listbox value={interval} onChange={setInterval}>
      <div className="flex items-center">
        <span className="mr-2 text-sm text-gray-400">
          Żądanie wysyłane co:
        </span>

        <div className="relative w-28 border-r border-r-gray-100 pr-3 mr-2">
          <Listbox.Button className="relative w-full pl-2 pr-10 py-0.5 bg-white text-left border border-gray-300 rounded cursor-default">
            <span className="block truncate">
              {interval.title}
            </span>

            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon className="w-4 h-4 text-gray-400"/>
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full z-50 max-h-60 bg-white ring-1 ring-black ring-gray-200 rounded shadow-lg overflow-auto focus:outline-none">
              {intervals.map((value, idx) => (
                <Listbox.Option key={idx} value={value} className={({ active }) => `relative pl-8 pr-4 py-1 ${active ? 'text-blue-900 bg-gray-100' : 'text-gray-900'} cursor-default select-none`}>
                  {({ selected }) => (
                    <>
                      <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                        {value.title}
                      </span>

                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-indigo-600">
                          <CheckIcon className="w-4 h-4" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </div>
    </Listbox>
  )
}

export default HostInterval
