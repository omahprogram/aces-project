import React from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import useUser from '../lib/useUser'
import { useRouter } from 'next/router'
import fetchJson from '../lib/fetchJson'

const Header = () => {
  const { user, mutateUser } = useUser()
	const router = useRouter()
 
  return (
    <header className="flex align-middle pt-0 pb-0 text-base pr-2">
      <nav className="md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0 text-right text-gray-700 bg-white">
        {user?.isLoggedIn && (
          <ul className="flex pt-3 pb-3 float-left">
            <label className="mr-2 ml-10 font-bold text-gray-800">{user.email}</label>
          </ul>
        )}
        <ul className="flex pt-3 pb-3 float-right">
          {!user?.isLoggedIn && (
            <>
              <li className="mr-2 ml-2">
                <Link href="/">
                  <a className=" hover:text-biru-vercel">Login</a>
                </Link>
              </li>
            </>
          )}
          {user?.isLoggedIn && (
            <>
              <li className="mr-2 ml-2">
                <a
                  href="/api/logout" className=" hover:text-biru-vercel"
                  onClick={async (e) => {
                    e.preventDefault()
                    await mutateUser(fetchJson('/api/logout'))
                    router.push('/')
                  }}
                >
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
