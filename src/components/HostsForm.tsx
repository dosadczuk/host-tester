import { ChangeEventHandler, FC } from 'react'

type HostInputProps = {
  value: string;
  error: string | null;

  onChange: ChangeEventHandler;
}

const HostsForm: FC<HostInputProps> = ({ value, error, onChange }) => {
  const hasError = error != null && error.length > 0

  return (
    <div className="py-4 flex items-start gap-1">
      <div className="w-full">
        <input type="text" value={value} onChange={onChange} placeholder="np. google.pl, 192.168.0.1"
               className={`w-full border ${hasError ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-200' : 'border-gray-200 focus:border-indigo-400 focus:ring-indigo-200'} placeholder-gray-300 rounded focus:ring-4`}
        />

        {error && (
          <small className="pl-2 text-sm text-rose-500 font-medium">
            {error}
          </small>
        )}
      </div>

      <button type="submit" disabled={hasError}
              className="py-2 px-4 border border-transparent bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-200 text-white font-medium focus:ring-4 rounded transition-colors"
      >
        Sprawdź
      </button>
    </div>
  )
}

export default HostsForm

