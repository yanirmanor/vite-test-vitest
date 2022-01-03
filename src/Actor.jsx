import { useEffect } from 'react'
import { useQuery } from 'react-query'
export function Actor () {
  async function fetchUser () {
    return await (await fetch('https://randomuser.me/api/')).json()
  }

  const { data, error, isError, isLoading, status } = useQuery(
    'posts',
    fetchUser
  )

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error! {error.message}</div>
  }

  return (
    <div>
      <h1>Actor</h1>
      <div>{data.results[0].name.first}</div>
      <div>{data.results[0].name.last}</div>
    </div>
  )
}
