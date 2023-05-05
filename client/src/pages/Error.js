
import { useNavigate, useRouteError } from 'react-router-dom'
import '../style/error.css'

const Error = () => {
  const err = useRouteError()
  const navigate = useNavigate()
  return (
    <div className='error'>
      <h1 style={{ color: 'red' }}>ERROR 404</h1>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{err.statusText || err.message}</i>
      </p>
      <button onClick={() => navigate('/')}>back</button>
    </div>
  )
}

export default Error
