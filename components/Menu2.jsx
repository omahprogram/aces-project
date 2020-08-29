import React from 'react'
import Link from 'next/link'

const Menu2 = ({buttonEdit}) => {
 
  return (
    <>
      <div className="max-w-screen-sm mx-auto flex content-center flex-wrap -mt-8 mb-8 justify-center text-biru-vercel font-medium">
        <ul className="flex pt-O float-right">
          <li className="mr-2 ml-2">
            <Link href='/'>
              <a className="hover:text-pink-700">Home</a>
            </Link>
          </li>
          <li className="mr-2 ml-2">
            <Link href='/project'>
              <a className="hover:text-pink-700">My Project</a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Menu2
