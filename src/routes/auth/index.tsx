import { h, FunctionComponent } from 'preact'
import { RoutableProps } from 'preact-router'
import style from './style.module.css'

const Auth: FunctionComponent<RoutableProps> = () => (
  <div class={style.home}>
    <h1>Auth</h1>
    <p>This is Auth page.</p>
  </div>
)

export default Auth
