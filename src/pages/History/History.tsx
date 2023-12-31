import { Status } from './components/Status'
import { useCyclesContext } from '../../contexts/CyclesContext'
import { differenceInSeconds, format, formatDistanceToNow } from 'date-fns'
import { Trash } from 'phosphor-react'

export function History() {
  const { cycles, deleteCycle } = useCyclesContext()

  return (
    <main className="flex flex-1 flex-col overflow-auto p-14">
      <h1 className="text-2xl text-gray-100">My history</h1>
      <div className="mt-8 flex-1 overflow-auto">
        <table className="w-full min-w-[600px] table-auto border-collapse">
          <thead>
            <tr>
              <th className="w-1/2 rounded-tl-[8px] bg-gray-600 p-4 pl-6 text-left text-sm leading-[1.6] text-gray-100">
                Task
              </th>
              <th className="bg-gray-600 p-4 text-left text-sm leading-[1.6] text-gray-100">
                Duration
              </th>
              <th className="bg-gray-600 p-4 text-left text-sm leading-[1.6] text-gray-100">
                Start
              </th>
              <th className="rounded-tr-[8px] bg-gray-600 p-4 pr-6 text-left text-sm leading-[1.6] text-gray-100">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="overflow-auto">
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td className="border-t-[4px] border-gray-800 bg-gray-700 p-4 pl-6 text-sm leading-[1.6]">
                    {cycle.task}
                  </td>
                  <td className="border-t-[4px] border-gray-800 bg-gray-700 p-4 text-sm leading-[1.6] ">
                    {cycle.finishedDate
                      ? format(
                          new Date(
                            0,
                            0,
                            0,
                            0,
                            0,
                            differenceInSeconds(
                              cycle.finishedDate,
                              cycle.startDate,
                            ),
                          ),
                          'm:ss',
                        )
                      : cycle.minutesAmount + `:00`}
                    {' minutes'}
                  </td>
                  <td className="border-t-[4px] border-gray-800 bg-gray-700 p-4 text-sm leading-[1.6] ">
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                    })}
                  </td>
                  <td className="border-t-[4px] border-gray-800 bg-gray-700 p-4 pr-6 text-sm leading-[1.6]">
                    <div className="flex justify-between">
                      {cycle.finishedDate && (
                        <Status statusColor="green"> Finished </Status>
                      )}
                      {cycle.interruptedDate && (
                        <Status statusColor="red"> Cancelled </Status>
                      )}
                      {!cycle.finishedDate && !cycle.interruptedDate && (
                        <Status statusColor="yellow"> In progress </Status>
                      )}

                      <button
                        onClick={() => deleteCycle(cycle.id)}
                        title="Deletar"
                        className="cursor-pointer rounded-[2px] border-0 bg-transparent leading-[0] text-gray-400 transition-colors hover:text-red-500"
                      >
                        <Trash size={24} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}
