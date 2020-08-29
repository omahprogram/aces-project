import { useEffect } from 'react'
import useSWR from 'swr'
// import apiFetchGet from './apiFetchGet'
import useUser from '../lib/useUser'

export default function useProjects() {
  // const { data: license, mutate: mutateLicense } = useSWR("/api/license")

  const { data: project } = useSWR("/api/project")

  // useEffect(() => {
  //   if (redirectTo) return
  // }, [license])

  // return { license, mutateLicense }
  return { project }

}

// OR COULD IT BE DONE WITH whithSession?