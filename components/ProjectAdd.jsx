import getProjects from '../lib/getProjects'
import { useRouter } from 'next/router';
import Link from "next/link";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useSWR, { mutate, trigger } from 'swr';
import useUser from '../lib/useUser'

export function ProjectAdd({buttonClick, mutasi}) {
  const { user } = useUser({ redirectTo: '/' })
  const { project } = getProjects({})
  const fetcher = url => fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${user.token}`
    }
  }).then(r => r.json())

  const {data, mutate} = useSWR('https://aces-api-dev.herokuapp.com/v1/projects', fetcher);
  const formik = useFormik({
    initialValues: {
			title: '',
			managedBy: ''
    },
		validationSchema: Yup.object({
      title: Yup.string()
				.required('*'),
      managedBy: Yup.string()
				.required('*')
		}),
		onSubmit: async (values, formikHelpers) => {
      console.log(JSON.stringify(values, null, 2))
      mutate('/api/project', [...data, values], false)
      const url = 'https://aces-api-dev.herokuapp.com/v1/projects?client=5f39f61eac698c9ceca620b5&contract=5f3b977a05652f69a844f0fe'
      await fetch(url, {
        body: JSON.stringify( values ),
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token
        }
      })
			.then(response => { 
				console.log(response)
			})
			.catch(error => {
				alert(error.response.data.detail)
			});			
      trigger('/api/project');
      formikHelpers.resetForm();
      mutasi();
      buttonClick();
		},
	});

  if (!project) {
    return <h3>Loading...</h3>
  }

  return (
    <div>
      <form className="bg-hitam-200 text-base w-full p-8 mb-8" onSubmit={formik.handleSubmit}>
        <div className="flex mb-2 w-full justify-center text-biru-vercel -mt-4 content-center text-xl font-semibold">Add Project</div>
        <div className="flex mb-2">
        	<div className="flex content-center flex-wrap w-1/5 ">
        		<label className="inline-block text-gray-700 text-sm font-medium" htmlFor="title">
        			Project Title
        		</label>
        	</div>
        	<input
        		className="w-3/5 shadow appearance-none border rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        		id="title" 
        		name="title"
        		type="text" 
        		placeholder="Project Title"
        		onChange={formik.handleChange}
        		onBlur={formik.handleBlur}
        		value={formik.values.title} />
        	{formik.touched.title && formik.errors.title ? (
        		<div className="text-red-700 px-3">{formik.errors.title}</div>
        	) : null}
        </div>
        <div className="flex mb-2">
        	<div className="flex content-center flex-wrap w-1/5 ">
        		<label className="inline-block text-gray-700 text-sm font-medium" htmlFor="managedBy">
              Managed By
        		</label>
        	</div>
        	<input
        		className="w-3/5 shadow appearance-none border rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        		id="managedBy" 
        		name="managedBy"
        		type="text" 
        		placeholder="Managed By"
        		onChange={formik.handleChange}
        		onBlur={formik.handleBlur}
        		value={formik.values.managedBy} />
        	{formik.touched.managedBy && formik.errors.managedBy ? (
        		<div className="text-red-700 px-3">{formik.errors.managedBy}</div>
        	) : null}
        </div>
        <div className="w-full flex mt-6">
        	<div className="w-1/2 text-right px-4">
        		<button type="submit" className="bg-gray-400 px-2 py-1 border border-solid border-black rounded-md hover:bg-gray-700">Submit</button>
        	</div>
        	<div className="w-1/2 text-left px-4">
        		<button type="reset" className="bg-gray-200 px-2 py-1 border border-solid border-black rounded-md hover:bg-gray-500" onClick={buttonClick}>Cancel</button>
        	</div>
        </div>
      </form>
    </div>
  )
}
