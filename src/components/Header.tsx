import { Scroll, Timer } from 'phosphor-react'
import logoignite from '../assets/logo-ignite.svg'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <header className="flex items-center justify-between ">
      <img src={logoignite} alt="" />
      <nav className="flex gap-2">
        <NavLink
          to="/"
          title="Home"
          className="grid h-12 w-12 place-items-center border-y-[3px] border-y-transparent text-gray-100 hover:border-b-green-500 [&.active]:text-green-500"
        >
          <Timer size={24} />
        </NavLink>
        <NavLink
          to="/history"
          title="History"
          className="grid h-12 w-12 place-items-center border-y-[3px] border-y-transparent text-gray-100 hover:border-b-green-500 [&.active]:text-green-500"
        >
          <Scroll size={24} />
        </NavLink>
      </nav>
    </header>
  )
}
