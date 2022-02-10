import { h, FunctionComponent } from 'preact'
import { RoutableProps } from 'preact-router'
import style from './style.module.css'

const Home: FunctionComponent<RoutableProps> = () => (
  <div class={style.home}>
    <h1>Home</h1>
    <p>This is the Home component.</p>
  </div>
)

export default Home
