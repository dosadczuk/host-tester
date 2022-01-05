import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline'
import { FC, Fragment } from 'react'

export type Interval = {
  title: string;
  value: number;
}

type HostIntervalsProps = {
  intervals: Interval[];
  interval: Interval;
  setInterval: (value: Interval) => void;
}

const HostIntervals: FC<HostIntervalsProps> = ({ intervals, interval, setInterval }) => {
  return (
    <Listbox value={interval} onChange={setInterval}>
      <div className="flex items-center">
        <div className="mr-2 text-sm text-gray-400">
          Żądanie wysyłane co:
        </div>
        <div className="relative w-32 border-r border-r-gray-200 pr-4 mr-3">
          <Listbox.Button
            className="relative w-full pl-2 pr-10 py-0.5 bg-white text-left border border-gray-200 rounded cursor-default">
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
            <Listbox.Options
              className="absolute z-50 w-full max-h-60 bg-white ring-1 ring-black ring-gray-200 rounded shadow-lg overflow-auto focus:outline-none"
            >
              {intervals.map((interval, index) => (
                <Listbox.Option
                  key={index}
                  value={interval}
                  className={({ active }) => `relative py-0.5 pl-8 pr-4 ${active ? 'text-blue-900 bg-blue-50' : 'text-gray-900'} cursor-default select-none`}
                >
                  {({ selected }) => (
                    <>
                    <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                      {interval.title}
                    </span>

                      {
                        selected
                          ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-blue-600">
                            <CheckIcon className="w-4 h-4"/>
                          </span>
                          )
                          : null
                      }
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

export default HostIntervals
