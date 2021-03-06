import { h } from 'preact'
import { Link } from 'preact-router/match'
import style from './style.module.css'

const Header = () => (
  <header class={style.header}>
    <h1>Last.fm Similar Graph</h1>
    <nav>
      <Link activeClassName={style.active} href="/">
        Home
      </Link>
      <Link activeClassName={style.active} href="/graph">
        Graph
      </Link>
    </nav>
  </header>
)

export default Header
