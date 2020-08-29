import { useEffect } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router';

// import apiFetchGet from './apiFetchGet'

export default function getProjects({}) {
  const router = useRouter();
  const {_id} = router.query;
  // const { data: license, mutate: mutateLicense } = useSWR("/api/license")
  const { data: project } = useSWR(`/api/project/${_id}`)

  // useEffect(() => {
  //   if (redirectTo) return
  // }, [license])

  // return { license, mutateLicense }
  return { project }
}

// OR COULD IT BE DONE WITH whithSession?