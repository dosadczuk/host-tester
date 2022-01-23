import { Decimal } from '@/components/common/Formatter'
import { Measurement, PingResponseSuccess } from '@/types'
import React, { FC, useMemo } from 'react'

type SessionTableProps = {
  responsesWithSuccess: [ number, PingResponseSuccess ][],
  responsesWithSuccessCount: number,
  minimumTimes: Measurement[],
  averageTimes: Measurement[],
  maximumTimes: Measurement[],
  standardDeviations: Measurement[]
}

const SessionTable: FC<SessionTableProps> = (props) => {
  const rows = useMemo(
    () => Array.from({ length: props.responsesWithSuccessCount }, (_, idx) => {
      return {
        id: props.responsesWithSuccess[idx][0],
        min: props.minimumTimes[idx],
        avg: props.averageTimes[idx],
        max: props.maximumTimes[idx],
        sd: props.standardDeviations[idx],
      }
    }),
    [ props ],
  )

  return (
    <div className="py-2 align-middle inline-block min-w-full">
      <div className="overflow-hidden border border-gray-200 rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <TableHeadCol>Żądanie</TableHeadCol>
              <TableHeadCol>Min [ms]</TableHeadCol>
              <TableHeadCol>Avg [ms]</TableHeadCol>
              <TableHeadCol>Max [ms]</TableHeadCol>
              <TableHeadCol>Sd [ms]</TableHeadCol>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row) => (
              <tr key={row.id}>
                <TableBodyCol>{row.id}</TableBodyCol>
                <TableBodyCol>
                  <Decimal value={row.min} />
                </TableBodyCol>
                <TableBodyCol>
                  <Decimal value={row.avg} />
                </TableBodyCol>
                <TableBodyCol>
                  <Decimal value={row.max} />
                </TableBodyCol>
                <TableBodyCol>
                  <Decimal value={row.sd} />
                </TableBodyCol>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const TableHeadCol: FC = ({ children }) => {
  return (
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  )
}

const TableBodyCol: FC = ({ children }) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900">
        {children}
      </div>
    </td>
  )
}

export default SessionTable
