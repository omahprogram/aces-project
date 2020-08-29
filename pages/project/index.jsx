import React, { useState } from 'react';
import Link from "next/link";
import Layout from '../../components/Layout'
import useUser from '../../lib/useUser'
import axios from 'axios';
import useSWR, { mutate, trigger } from 'swr';
import Menu from '../../components/Menu'
import Project from '../../components/Project'
import {ProjectAdd} from '../../components/ProjectAdd'
import { useFormik } from 'formik';

const ProjectsPage = () => {
  const { user } = useUser({ redirectTo: '/' })
  const [showAdd, setShowAdd] = useState(false);
	const [showButton, setShowButton] = useState(true);

  const {data, mutate} = useSWR('/api/project');

  function toggle(){
    setShowAdd(!showAdd);
    setShowButton(!showButton);
  }
  if (!user) {
    return <h3>Loading...</h3>
  }

  return (
    <Layout>
      {user?.isLoggedIn && (
        <>
        <div className="max-w-screen-sm mx-auto flex content-center flex-wrap mb-8 text-5xl justify-center">
          <label className="font-semibold text-gray-900">Projects Page </label>&nbsp;
        </div>
        <Menu buttonClick={toggle.bind(this)}/>
        <div className="max-w-screen-sm mx-auto d-flex text-lg">
          <div style={{
            display: showAdd?"block":"none"
            }}>
            <ProjectAdd buttonClick={toggle.bind(this)} mutasi={mutate}/>
          </div>
          <Project buttonClick={toggle.bind(this)}/>
        </div>
        </>
      )}
    </Layout>
  )

}


export default ProjectsPage
