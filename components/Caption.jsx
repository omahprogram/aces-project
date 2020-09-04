import React from 'react'
import Link from 'next/link'

const Caption = ({caption}) => {
 
  return (
    <>
      <div className="max-w-screen-sm mx-auto flex content-center flex-wrap mb-8 text-5xl justify-center">
        <label className="font-bold text-biru-vercel">{caption} </label>&nbsp;
      </div>
    </>
  )
}

export default Caption
