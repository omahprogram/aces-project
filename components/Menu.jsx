import React from 'react'
import Link from 'next/link'

const Menu = ({buttonClick, part}) => {
 
  return (
    <>
      <div className="max-w-screen-sm mx-auto flex content-center flex-wrap -mt-8 mb-8 justify-center text-gray-800 font-medium">
        <ul className="flex pt-O float-right">
          <li className="mr-2 ml-2">
            <Link href='/'>
              {part == 'dashboard' ? <a className="text-biru-vercel hover:text-pink-700">Home</a>
              : <a className="hover:text-pink-700">Home</a>}
            </Link>
          </li>
          <li className="mr-2 ml-2">
          <Link href='/project'>
              {part == 'project'
              ? <a className="text-biru-vercel hover:text-pink-700">My Project</a>
              : <a className="hover:text-pink-700">My Project</a>}              
          </Link>
          {part == 'project'
          ? <><br />
            <Link href='/project'>
              <a className="hover:text-pink-700 font-normal" onClick={buttonClick}>Add New</a>
            </Link></>
          : <></> }
          </li>
          <li className="mr-2 ml-2">
            <Link href=''>
              <a className="hover:text-pink-700" ></a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Menu
