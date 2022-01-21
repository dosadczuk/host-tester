import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SessionChartWithAverageTimes from '@/components/SessionChartWithAverageTimes'
import SessionHeading from '@/components/SessionHeading'
import SessionMeasurement from '@/components/SessionMeasurement'
import SessionPingInterval from '@/components/SessionPingInterval'
import SessionStatus from '@/components/SessionStatus'
import useClientSession from '@/hooks/useClientSession'
import useClientSessionReq from '@/hooks/useClientSessionReq'
import useClientSessionRes from '@/hooks/useClientSessionRes'
import { Disclosure, Tab } from '@headlessui/react'
import { useRouter } from 'next/router'
import { If, Then } from 'react-if'

const Print = () => {
  const router = useRouter()
  const { id } = router.query
  const { session, isLoading } = useClientSession(id)
  const {
    nextRequestId, addResponse,
    minimum, minimumTimes,
    average, averageTimes,
    maximum, maximumTimes,
    standardDeviations,
    responsesWithErrorCount,
    responsesWithError
  } = useClientSessionRes(session)
  const {
    resetRequesting,
  } = useClientSessionReq(nextRequestId, session, addResponse)

  
  const isPrintReady = () => {
    print();
    window.onafterprint = function(event) { router.push('/') };
    window.onafterprint = function(event) { router.push('/') };
  }

  let rows = [];
  
  for (let i=0; i<averageTimes.length; i++) {
    rows.push({
      requestId: responsesWithError[i][1].requestId,
      minimumT: minimumTimes[i],
      maximumT: maximumTimes[i],
      averageT: averageTimes[i],
      standardDeviationsT: standardDeviations[i],
      responsesWithErrorCountT: responsesWithError[i][1].packetLoss
    });
  }

  return (
    <section id={id} className="py-2 px-4 bg-white text-gray-800 border border-gray-200 rounded-xl">
      <Disclosure defaultOpen>
        <header className="flex justify-between items-center py-2">
          <h2 className="flex items-center gap-3 text-left">
            <SessionStatus isLoading={isLoading} />
            <SessionHeading session={session} />
          </h2>
          <div className="flex items-center gap-1">
              <SessionMeasurement
                name="min"
                time={minimum}
                title="Minimalny czas odpowiedzi"
                className="bg-emerald-100 text-emerald-700"
              />
              <SessionMeasurement
                name="avg"
                time={average}
                title="Średni czas odpowiedzi"
                className="bg-blue-100 text-blue-700"
              />
              <SessionMeasurement
                name="max"
                time={maximum}
                title="Maksymalny czas odpowiedzi"
                className="bg-rose-100 text-rose-700"
              />
          </div>
        </header>
        <If condition={!isLoading}>
          <Then>
            <Disclosure.Panel>
              <Tab.Group as="article" className="pb-2 pt-8">
                <Tab.List as="div" className="flex justify-end items-center gap-1">
                  <Tab as="button">
                  <SessionPingInterval onChange={resetRequesting} />
                  </Tab>
                </Tab.List>

                <Tab.Panels>
                  <Tab.Panel>
                    <SessionChartWithAverageTimes
                      wantAnimation={true}
                      sessionId={session?.id}
                      averageTimes={averageTimes}
                      standardDeviations={standardDeviations}
                      isAnimationEnd={isPrintReady}
                      width={900}
                    />
                    <TableContainer component={Paper} sx={{marginTop:10}}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>RequestId</TableCell>
                            <TableCell align="right">Minimum[ms]</TableCell>
                            <TableCell align="right">Maximum[ms]</TableCell>
                            <TableCell align="right">Average[ms]</TableCell>
                            <TableCell align="right">Standard Deviations[ms]</TableCell>
                            <TableCell align="right">Packet loss[%]</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.requestId}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.requestId}
                              </TableCell>
                              <TableCell align="right">{row.minimumT}</TableCell>
                              <TableCell align="right">{row.maximumT}</TableCell>
                              <TableCell align="right">{row.averageT}</TableCell>
                              <TableCell align="right">{row.standardDeviationsT}</TableCell>
                              <TableCell align="right">{row.responsesWithErrorCountT}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </Disclosure.Panel>
          </Then>
        </If>
      </Disclosure>
    </section>
  )
}

export default Print
