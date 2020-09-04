import { useState } from 'react'
import useUser from '../lib/useUser'
import Layout from '../components/Layout'
import Form from '../components/Form'
import fetchJson from '../lib/fetchJson'
import { useRouter } from 'next/router'
import Menu from '../components/Menu'
import Caption from '../components/Caption'

const Login = () => {

	const router = useRouter()
	const { user, mutateUser } = useUser({});
	const [errorMsg, setErrorMsg] = useState('')
	
  async function handleSubmit(e) {
    e.preventDefault()

    const body = {formBody: 'grant_type=&username=' +
         e.currentTarget.username.value + '&' +
         'password=' + e.currentTarget.password.value + '&scope=&client_id=&client_secret='}
    try {
      await mutateUser(
        fetchJson('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      )
    } catch (error) {
      console.error('An unexpected error happened:', error)
      setErrorMsg(error.data.message)
    }
  }

  return (
    <Layout>
      {!user?.isLoggedIn && (
        <>
          <Caption caption='WELCOME to ACES' />
          <div className="max-w-xs mx-auto -mt-48 h-screen flex content-center flex-wrap">
            <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
          </div>
        </>
      )}
      {user?.isLoggedIn && (
        <>
          <Caption caption='Dashboard' />
          <Menu part='dashboard'/>
        </>
      )}
    </Layout>
  )
}

export default Login
