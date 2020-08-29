import { useState } from 'react'
import useUser from '../lib/useUser'
import Layout from '../components/Layout'
import Form from '../components/Form'
import fetchJson from '../lib/fetchJson'
import { useRouter } from 'next/router'
import Menu from '../components/Menu'

const Login = () => {

	const router = useRouter()
	const { mutateUser } = useUser({});
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
      <div className="max-w-screen-sm mx-auto flex content-center flex-wrap mb-8 text-5xl justify-center">
        <label className="font-semibold text-gray-900">WELCOME to </label>&nbsp;
        <label className="font-bold text-biru-vercel"> ACES</label>
      </div>
        <div className="max-w-xs mx-auto -mt-48 h-screen flex content-center flex-wrap">
          <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
        </div>
    </Layout>
  )
}

export default Login
