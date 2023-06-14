import { HandPalm, Play } from 'phosphor-react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, 'Enter your task'),
  minutesAmount: z
    .number()
    .min(1, 'Cycle needs to be at least 5 minutes')
    .max(60, 'Cycle needs to be less than 60 minutes'),
})

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const {
    activeCycle,
    createNewCycle,
    interruptCurrentCycle,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
  } = useCyclesContext()

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  let isFinished = false

  if (activeCycle) {
    const totalSeconds = activeCycle.minutesAmount * 60

    isFinished = amountSecondsPassed > totalSeconds
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <form
        action=""
        onSubmit={handleSubmit(handleCreateNewCycle)}
        className="flex flex-col items-center gap-14"
      >
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle && !isFinished && (
          <button
            type="button"
            onClick={interruptCurrentCycle}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] border-0 bg-red-500 p-4 font-bold text-gray-100 shadow-red-700 transition-colors disabled:cursor-not-allowed disabled:opacity-70 [&:not(:disabled):hover]:bg-red-700"
          >
            <HandPalm size={24} />
            Stop
          </button>
        )}
        {activeCycle && isFinished && (
          <button
            type="button"
            onClick={markCurrentCycleAsFinished}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] border-0 bg-green-500 p-4 font-bold text-gray-100 shadow-green-700 transition-colors disabled:cursor-not-allowed disabled:opacity-70 [&:not(:disabled):hover]:bg-green-700"
          >
            <HandPalm size={24} />
            Finish
          </button>
        )}

        {!activeCycle && (
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] border-0 bg-green-500 p-4 font-bold text-gray-100 transition-colors disabled:cursor-not-allowed disabled:opacity-70 [&:not(:disabled):hover]:bg-green-700"
          >
            <Play size={24} />
            Start
          </button>
        )}
      </form>
    </main>
  )
}
