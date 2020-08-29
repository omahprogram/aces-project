// Aces API GET fetcher

// export default async function apiFetchGet(url, token) {
//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       Authorization: 'Bearer ' + token,
//     }
//   })
//   return response.json()
// }

export default async function apiFetchGet(url, token, method='GET', body=null) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    }
  })
  return response.json()
}