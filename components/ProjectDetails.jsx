import React, { useState } from 'react';
import getProjects from '../lib/getProjects'
import { useRouter } from 'next/router';
import Link from "next/link";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useSWR, { mutate, trigger } from 'swr';
import useUser from '../lib/useUser'
import axios from 'axios';

const ProjectDetails = ({id}) => {
  const { user } = useUser({ redirectTo: '/' })
  const { project } = getProjects({})
  const {dataproyek, mutate} = useSWR(`/api/project/${id}`, { initialData: project});
  const [showEdit, setShowEdit] = useState(false);
	const [showButtonEdit, setShowButtonEdit] = useState(true);
  function toggleEdit(){
    setShowEdit(!showEdit);
    setShowButtonEdit(!showButtonEdit);
  }
  const formik = useFormik({
    initialValues: {
      title: ''
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('harus diisi')
    }),
		onSubmit: async (values, formikHelpers) => {
      
//      mutate(`/api/project/${id}`, [...data, values], false)
//      alert(JSON.stringify(values, null, 2))
      await axios.put('https://aces-api-dev.herokuapp.com/v1/projects/' + id, values, 
        { headers: { Authorization: `Bearer ${user.token}` }
      })
      .then(response => { 
				console.log(response)
			})
			.catch(error => {
				alert(error.response.data.detail)
      });	
      		
      trigger(`/api/project/${project._id}`);
      formikHelpers.resetForm();
      mutate();
      toggleEdit();
		},
  });

  if (!project) {
    return <h3>Loading...</h3>
  }

  return (
    <div>
      Nama Proyek : 
      <div 
        style={{ display: showButtonEdit?"block":"none" }} 
        className="py-1 text-gray-700 font-bold pl-5">{project.title}
      </div>
      <form className="w-full" onSubmit={formik.handleSubmit}>
      <div style={{ display: showEdit?"block":"none" }}>
        <input
          className="w-3/5 shadow appearance-none border rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title" 
          name="title"
          type="text" 
          placeholder="Nama User di Tenant"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title} />
        {formik.touched.title && formik.errors.title ? (
          <div className="text-red-700 px-3">{formik.errors.title}</div>
        ) : null}
      </div>
      <div className="w-full flex mt-6">
          <button type="button" className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded leading-3 border border-gray-500" onClick={toggleEdit} style={{display: showButtonEdit?"block":"none" }}>Edit Profile</button>
          <div className="w-1/2 text-right px-4" style={{display: showEdit?"block":"none" }}>
            <button type="submit" className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded leading-3 border border-gray-500">Submit</button>
          </div>
          <div className="w-1/2 text-left px-4" style={{display: showEdit?"block":"none" }}>
            <button type="reset" className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded leading-3 border border-gray-500" onClick={toggleEdit} >Close</button>
          </div>
        </div>
      </form>
      <pre className="pre">{JSON.stringify(project, undefined, 2)}</pre>
    </div>
  )
}

export default ProjectDetails
