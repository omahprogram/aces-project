import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from './Header'
import PropTypes from 'prop-types'

const Layout = ({ children }) => (
  <>
    <Head>
      <title>ACES APP</title>
    </Head>
    <Header />

    <main>
      <div className="mt-20 pr-8 pl-8 block">

        {children}

      </div>
    </main>
  </>
)

export default Layout

Layout.propTypes = {
  children: PropTypes.node,
}
