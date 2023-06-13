import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'
import { useCyclesContext } from '../../../contexts/CyclesContext'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useCyclesContext()

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutesAmountFixed = String(minutesAmount).padStart(2, '0')
  const secondsAmountFixed = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (!activeCycle) return
    document.title = `${minutesAmountFixed}:${secondsAmountFixed}`
  }, [minutesAmountFixed, secondsAmountFixed, activeCycle])

  useEffect(() => {
    if (!activeCycle) return

    const interval = setInterval(() => {
      const passedTimeInSeconds = differenceInSeconds(
        new Date(),
        activeCycle.startDate,
      )

      if (passedTimeInSeconds >= totalSeconds) {
        setSecondsPassed(totalSeconds)
        markCurrentCycleAsFinished()
        return () => clearInterval(interval)
      } else {
        setSecondsPassed(passedTimeInSeconds)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  return (
    <div className="flex gap-4 font-robotomono text-[10rem] leading-[8rem] text-gray-100">
      <span className="rounded-[8px] bg-gray-700 px-4 py-8">
        {minutesAmountFixed[0]}
      </span>
      <span className="rounded-[8px] bg-gray-700 px-4 py-8">
        {minutesAmountFixed[1]}
      </span>
      <span className="flex w-16 justify-center overflow-hidden px-0 py-8 text-green-500">
        :
      </span>
      <span className="rounded-[8px] bg-gray-700 px-4 py-8">
        {secondsAmountFixed[0]}
      </span>
      <span className="rounded-[8px] bg-gray-700 px-4 py-8">
        {secondsAmountFixed[1]}
      </span>
    </div>
  )
}
