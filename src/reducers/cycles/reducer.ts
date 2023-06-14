import { ActionTypes } from './actions'
import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      return produce(state, (draft) => {
        const activeCycle = draft.cycles.find(
          (cycle) => cycle.id === state.activeCycleId,
        )
        if (activeCycle) {
          activeCycle.interruptedDate = new Date()
          draft.activeCycleId = null
        }
      })
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return produce(state, (draft) => {
        const activeCycle = draft.cycles.find(
          (cycle) => cycle.id === state.activeCycleId,
        )
        if (activeCycle) {
          activeCycle.finishedDate = new Date()
          draft.activeCycleId = null
        }
      })

    case ActionTypes.DELETE_CYCLE:
      return produce(state, (draft) => {
        const cycleIndex = draft.cycles.findIndex(
          (cycle) => cycle.id === action.payload.id,
        )
        if (cycleIndex !== -1) {
          draft.cycles.splice(cycleIndex, 1)
        }
      })

    default:
      return state
  }
}
