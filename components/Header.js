import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

// Third Party
import { Fade as Hamburger } from "hamburger-react"
import { FiSearch, FiX } from "react-icons/fi"

function Header() {
  const router = useRouter()

  const [isOpen, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const handleSearch = (event) => {
    event.preventDefault()
    router.push(`/search?value=${searchValue}`)
  }

  return (
    <header className="fixed top-0 left-0 bg-white w-full h-[80px] z-10 shadow">
      <div className="container flex justify-between items-center h-full">
        <Link
          href="/"
          className="w-1/3 text-2xl font-semibold text-primary-900"
        >
          DRIVERSIDN
        </Link>
        <div
          className={`bg-white absolute p-8 xl:p-0 ${
            isOpen ? "left-0" : "left-[-120%]"
          } xl:static top-[80px] w-full xl:w-2/3 flex flex-col xl:flex-row xl:items-center xl:justify-between transition-all shadow xl:shadow-none`}
        >
          <nav className="text-primary-900 mb-6 xl:mb-0">
            <ul className="flex flex-col xl:flex-row gap-6 text-center xl:text-left xl:gap-10">
              <li className="hover:text-primary-600">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-primary-600">
                <Link href="/category/latest-updates">Druckertreiber</Link>
              </li>
              <li className="hover:text-primary-600">
                <Link href="/category/most-populars">Scannertreiber</Link>
              </li>
            </ul>
          </nav>
          <form className="flex bg-gray-100 py-[6px] px-4 items-center gap-2 rounded-lg">
            <button onClick={handleSearch} type="submit">
              <FiSearch size={22} className="text-gray-700 cursor-pointer" />
            </button>
            <div className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search"
                className="bg-transparent p-1 pr-8 focus:outline-none"
              />
              <FiX
                size={22}
                onClick={() => setSearchValue("")}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-700 cursor-pointer"
              />
            </div>
          </form>
        </div>
        <button className="xl:hidden">
          <Hamburger size={28} toggled={isOpen} toggle={setOpen} />
        </button>
      </div>
    </header>
  )
}

export default Header
