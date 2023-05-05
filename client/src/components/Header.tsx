import { NavLink, useNavigate } from 'react-router-dom'
import '../style/header.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../api/authSlice'

const Header = () => {
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const goOut = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div className='header'>
      <NavLink to={'/'} end>HOME</NavLink>
      <NavLink to={'/employee'}>Employee</NavLink>
      {user ?
        <button className='btn' onClick={goOut}>Go out</button>
        :
        <div className="open">
          <NavLink to={'/login'}>login</NavLink>
          <NavLink to={'/register'}>register</NavLink>
        </div>
      }
    </div>
  )
}

export default Header
