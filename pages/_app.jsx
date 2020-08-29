import React from 'react';
import Head from 'next/head';
import "./styles.css";
import '../styles/index.css'
import "react-table/react-table.css";
import { SWRConfig } from 'swr'
import fetch from '../lib/fetchJson'
import Router from 'next/router'

export default function MyApp({ Component, pageProps }) {
	return (
    <SWRConfig
      value={{
        fetcher: fetch,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
			<Head>
      </Head>
      <Component {...pageProps} />
    </SWRConfig>
	);
}
