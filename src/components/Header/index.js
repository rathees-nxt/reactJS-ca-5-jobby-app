import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <ul className="header-list-container">
        <li className="header-logo">
          <Link to="/" className="nav-link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo-img"
            />
          </Link>
        </li>
        <li className="header-navlink-item">
          <Link to="/" className="nav-link">
            <h1 className="nav-home">Home</h1>
            <AiFillHome className="nav-icon" />
          </Link>
          <Link to="/jobs" className="nav-link">
            <h1 className="nav-home">Jobs</h1>
            <BsBriefcaseFill className="nav-icon" />
          </Link>
        </li>
        <li className="button-container">
          <FiLogOut className="nav-icon" />
          <button className="logout-btn" type="button" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
