import fetchJson from '../../lib/fetchJson'
import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const { formBody } = await req.body
  const url = 'https://aces-api-dev.herokuapp.com/v1/token'
  console.log(url)

  try {
    const result = await fetchJson(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    })
    const apiUser = result.user
    const user = {
      isLoggedIn: true,
      license: apiUser.license,
      token: result.access_token,
      username: apiUser.username,
      email: apiUser.email,
      licenseOwner: apiUser.licenseOwner,
      verified: apiUser.verified,
      disabled: apiUser.disabled,
      userRoles: apiUser.userRoles,
      id: apiUser.id
//      license: resultme.license
    }
    req.session.set('user', user)
       await req.session.save()
    res.json(user)
    console.log(JSON.stringify(user))
  } catch (error) {
    const { response: fetchResponse } = error
     res.status(fetchResponse?.status || 500).json(error.data)
//    res.status(404).json({ message: "Couldn't find user" })
  }
})
