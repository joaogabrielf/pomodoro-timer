import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useReducer,
  useEffect,
} from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  createNewCycleAction,
  deleteCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'
// @ts-ignore
import useSound from 'use-sound'
import alert from '../assets/alert.wav'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
  deleteCycle: (id: string) => void
  play: () => void
}

const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

const useCycles = () => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJson = localStorage.getItem(
        '@pomodoro-timer/cycles-state-1.0.0',
      )

      if (storedStateAsJson) {
        return JSON.parse(storedStateAsJson)
      }

      return initialState
    },
  )
  const { cycles, activeCycleId } = cyclesState
  const [play] = useSound(alert)

  const cyclesFixedDates = cycles.map((cycle) => {
    const startDate = new Date(cycle.startDate)
    const interruptedDate = cycle.interruptedDate
      ? new Date(cycle.interruptedDate)
      : cycle.interruptedDate

    const finishedDate = cycle.finishedDate
      ? new Date(cycle.finishedDate)
      : cycle.finishedDate

    return {
      ...cycle,
      startDate,
      interruptedDate,
      finishedDate,
    }
  })

  const activeCycle = cyclesFixedDates.find(
    (cycle) => cycle.id === activeCycleId,
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState)

    localStorage.setItem('@pomodoro-timer/cycles-state-1.0.0', stateJson)
  }, [cyclesState])

  function createNewCycle({ task, minutesAmount }: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    }

    dispatch(createNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())

    setAmountSecondsPassed(0)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())

    setAmountSecondsPassed(0)
  }

  function deleteCycle(id: string) {
    dispatch(deleteCycleAction(id))
  }

  return {
    cycles: cyclesFixedDates,
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed: (seconds: number) => setAmountSecondsPassed(seconds),
    interruptCurrentCycle,
    createNewCycle,
    deleteCycle,
    play,
  }
}

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  return (
    <CyclesContext.Provider value={useCycles()}>
      {children}
    </CyclesContext.Provider>
  )
}

export const useCyclesContext = () => useContext(CyclesContext)
