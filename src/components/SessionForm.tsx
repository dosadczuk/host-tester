import { Nullable } from '@/types'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChangeEventHandler, FC, FormEventHandler } from 'react'
import { Else, If, Then } from 'react-if'

type SessionFormProps = {
  value: string,
  error: Nullable<string>,

  onChange: ChangeEventHandler,
  onSubmit: FormEventHandler,
  isSubmitting: boolean
}

const SessionForm: FC<SessionFormProps> = ({ value, error, onChange, onSubmit, isSubmitting }) => {
  const hasError = error != null && error.length > 0

  return (
    <form onSubmit={onSubmit}>
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

        <button type="submit" disabled={hasError || isSubmitting}
          className="w-32 py-2 px-4 border border-transparent bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-200 text-white font-medium focus:ring-4 rounded transition-colors"
        >
          <If condition={!isSubmitting}>
            <Then>
              Sprawdź
            </Then>
            <Else>
              <FontAwesomeIcon icon={faSpinner} className="fa-spin text-indigo-600" />
            </Else>
          </If>
        </button>
      </div>
    </form>
  )
}

export default SessionForm
