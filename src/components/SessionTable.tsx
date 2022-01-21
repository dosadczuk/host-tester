import { Decimal } from '@/components/common/Formatter'
import { SessionResult } from '@/hooks/useClientSessionRes'
import React, { FC, useMemo } from 'react'

type SessionTableProps = {
  result: SessionResult;
}

const SessionTable: FC<SessionTableProps> = ({ result }) => {
  const rows = useMemo(
    () => {
      const {
        responsesWithSuccess,
        responsesWithSuccessCount,
        minimumTimes,
        averageTimes,
        maximumTimes,
        standardDeviations,
        packetLosses,
      } = result

      return Array.from({ length: responsesWithSuccessCount }, (_, idx) => {
        return {
          id: responsesWithSuccess[idx][0],
          min: minimumTimes[idx],
          avg: averageTimes[idx],
          max: maximumTimes[idx],
          sd: standardDeviations[idx],
          pl: packetLosses[idx],
        }
      })
    },
    [ result ],
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
              <TableHeadCol>Packet loss</TableHeadCol>
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
                <TableBodyCol>
                  {row.pl}
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
