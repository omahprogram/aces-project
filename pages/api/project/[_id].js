import withSession from '../../../lib/session'
import useSWR from 'swr'
import { useRouter } from 'next/router';
// import apiFetchGet from '../../lib/apiFetchGet'

export default withSession(async (req, res) => {
  const user = req.session.get('user')
  const {
    query: { _id },
  } = req
//  console.log(user)
  console.log(req.query._id)
//  const router = useRouter()
//  console.log(_id)


  if (user) {
    const url = 'http://aces-api-dev.herokuapp.com/v1/projects/' + req.query._id
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + user.token,
      }
    })
    const project = await response.json()
//    console.log(project)
    res.json(project)
  } else {
    res.json({})
  }


})
