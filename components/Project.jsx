import useProjects from '../lib/useProjects'
import Link from "next/link";
import useUser from '../lib/useUser'

const Project = () => {
  const { user } = useUser({ redirectTo: '/' })
  const { project } = useProjects({})
  if (!project) {
    return <h3>Loading...</h3>
  }

  return (
    <div>
      {user?.isLoggedIn && (
        <>
        {project.map((proj) => (
          <div className="mb-4" key={proj._id}>
            <div className="">
              <Link href='/project/[_id]' as={`/project/${proj._id}`}>
                <a className="leading-8 text-blue-700 text-center whitespace-no-wrap font-semibold">{proj._id}</a>
              </Link>
            </div>
            <div className="">
              Project Title : &nbsp;{proj.title}
            </div>
          </div>
          )
        )}
        </>
      )}
      {/* <h3>License component using useLicense React Hook</h3> */}
      <pre className="pre">{JSON.stringify(project, undefined, 2)}</pre>
    </div>
  )
}

export default Project
