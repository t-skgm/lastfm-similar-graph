import { h, FunctionComponent } from 'preact'
import { RoutableProps } from 'preact-router'
import { useEffect, useState } from 'preact/hooks'
import style from './style.module.css'

// Note: `user` comes from the URL, courtesy of our router
const Profile: FunctionComponent<RoutableProps & { user?: string }> = ({ user }) => {
  const [time, setTime] = useState(Date.now())
  const [count, setCount] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => setTime(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div class={style.profile}>
      <h1>Profile: {user}</h1>
      <p>This is the user profile for a user named {user}.</p>

      <div>Current time: {new Date(time).toLocaleString()}</div>

      <p>
        <button onClick={() => setCount(count => count + 1)}>Click Me</button> Clicked {count} times.
      </p>
    </div>
  )
}

export default Profile
