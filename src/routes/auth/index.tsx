import { h, FunctionComponent } from 'preact'
import { RoutableProps } from 'preact-router'
import style from './style.css'

const Auth: FunctionComponent<RoutableProps> = () => (
  <div class={style.home}>
    <h1>Auth</h1>
    <p>This is the Home component.</p>
  </div>
)

export default Auth
