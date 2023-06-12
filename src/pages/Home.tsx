import { Play } from 'phosphor-react'

export function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <form action="" className="flex flex-col items-center gap-14">
        <div className="flex w-full flex-wrap items-center justify-center gap-2 text-lg font-bold text-gray-100">
          <label htmlFor="task">Vou trabalhar em</label>
          <input
            id="task"
            type="text"
            placeholder="Give your project a name"
            list="task-suggestions"
            className="h-10 flex-1 border-0 border-b-2 border-gray-500 bg-transparent px-2 py-0 text-lg font-bold placeholder:text-gray-500 focus:border-green-500 focus:shadow-none [&::-webkit-calendar-picker-indicator]:!hidden"
          />

          <datalist id="task-suggestions">
            <option value="Study" />
            <option value="Work" />
          </datalist>

          <label htmlFor="minutesAmount">por</label>
          <input
            type="number"
            step={5}
            min={5}
            max={60}
            id="minutesAmount"
            placeholder="00"
            className="h-10 w-16 border-0 border-b-2 border-gray-500 bg-transparent px-2 py-0 text-lg font-bold placeholder:text-gray-500 focus:border-green-500 focus:shadow-none"
          />

          <span>minutos.</span>
        </div>

        <div className="flex gap-4 font-robotomono text-[10rem] leading-[8rem] text-gray-100">
          <span className="rounded-[8px] bg-gray-700 px-4 py-8">0</span>
          <span className="rounded-[8px] bg-gray-700 px-4 py-8">0</span>
          <span className="flex w-16 justify-center overflow-hidden px-0 py-8 text-green-500">
            :
          </span>
          <span className="rounded-[8px] bg-gray-700 px-4 py-8">0</span>
          <span className="rounded-[8px] bg-gray-700 px-4 py-8">0</span>
        </div>

        <button
          type="submit"
          disabled
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] border-0 bg-green-500 p-4 font-bold text-gray-100 transition-colors disabled:cursor-not-allowed disabled:opacity-70 [&:not(:disabled):hover]:bg-green-700"
        >
          <Play size={24} />
          Começar
        </button>
      </form>
    </main>
  )
}
