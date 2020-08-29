import withSession from '../../lib/session'
import useSWR from 'swr'
// import apiFetchGet from '../../lib/apiFetchGet'
import useUser from '../../lib/useUser'

export default withSession(async (req, res) => {
  const user = req.session.get('user')

//  console.log(user)

  if (user) {
    const url = 'http://aces-api-dev.herokuapp.com/v1/projects'
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
