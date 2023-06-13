import { useFormContext } from 'react-hook-form'
import { useCyclesContext } from '../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycle } = useCyclesContext()
  const { register } = useFormContext()

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2 text-lg font-bold text-gray-100">
      <label htmlFor="task">Vou trabalhar em</label>
      <input
        id="task"
        type="text"
        placeholder="Give your project a name"
        list="task-suggestions"
        {...register('task')}
        disabled={!!activeCycle}
        className="h-10 flex-1 border-0 border-b-2 border-gray-500 bg-transparent px-2 py-0 text-lg font-bold placeholder:text-gray-500 focus:border-green-500 focus:shadow-none [&::-webkit-calendar-picker-indicator]:!hidden"
      />

      <datalist id="task-suggestions">
        <option value="Study" />
        <option value="Work" />
      </datalist>

      <label htmlFor="minutesAmount">por</label>
      <input
        type="number"
        step={1}
        min={1}
        max={60}
        id="minutesAmount"
        disabled={!!activeCycle}
        placeholder="00"
        {...register('minutesAmount', { valueAsNumber: true })}
        className="h-10 w-16 border-0 border-b-2 border-gray-500 bg-transparent px-2 py-0 text-lg font-bold placeholder:text-gray-500 focus:border-green-500 focus:shadow-none"
      />

      <span>minutos.</span>
    </div>
  )
}
