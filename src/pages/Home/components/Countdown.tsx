import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'
import { useCyclesContext } from '../../../contexts/CyclesContext'

export function Countdown() {
  const {
    activeCycle,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useCyclesContext()

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = activeCycle
    ? Math.abs(amountSecondsPassed - totalSeconds)
    : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  // PAGE TITLE
  useEffect(() => {
    if (!activeCycle) {
      document.title = 'Pomodoro Timer'
    } else {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const isAdditionalTime = amountSecondsPassed > totalSeconds

  useEffect(() => {
    if (!activeCycle) return

    const interval = setInterval(() => {
      const passedTimeInSeconds = differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate),
      )

      setSecondsPassed(passedTimeInSeconds)
    }, 1000)

    return () => clearInterval(interval)
  }, [activeCycle, totalSeconds, markCurrentCycleAsFinished, setSecondsPassed])

  return (
    <div className="relative flex gap-4 font-robotomono text-[10rem] leading-[8rem] text-gray-100">
      {isAdditionalTime && (
        <span className="absolute flex w-16 translate-x-[-6rem] justify-center overflow-hidden px-0 py-8 text-green-500">
          +
        </span>
      )}
      <span className="rounded-[8px] bg-gray-700 px-4 py-8">{minutes[0]}</span>
      <span className="rounded-[8px] bg-gray-700 px-4 py-8">{minutes[1]}</span>
      <span className="flex w-16 justify-center overflow-hidden px-0 py-8 text-green-500">
        :
      </span>
      <span className="rounded-[8px] bg-gray-700 px-4 py-8">{seconds[0]}</span>
      <span className="rounded-[8px] bg-gray-700 px-4 py-8">{seconds[1]}</span>
    </div>
  )
}
