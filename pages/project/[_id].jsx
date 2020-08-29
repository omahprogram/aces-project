import React, { useState } from 'react';
import Link from "next/link";
import Layout from '../../components/Layout'
import useUser from '../../lib/useUser'
import axios from 'axios';
import useSWR, { mutate, trigger } from 'swr';
import Menu2 from '../../components/Menu2'
import ProjectDetails from '../../components/ProjectDetails'
import { useRouter } from 'next/router';

const IdProjectPage = () => {
  const { user } = useUser({ redirectTo: '/' })
  const router = useRouter();
  const {_id} = router.query;

  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto flex content-center flex-wrap mb-8 text-5xl justify-center">
        <label className="font-semibold text-gray-900">Detail Project </label>&nbsp;
      </div>
      <Menu2 />
      <div className="max-w-screen-sm mx-auto d-flex text-lg">
        <ProjectDetails id={_id}/>
      </div>
    </Layout>
  )

}


export default IdProjectPage
