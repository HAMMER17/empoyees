import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEditEmployeeMutation, useGetEmployeeQuery, useRemoveEmployeeMutation } from '../app/services/employees';

import '../style/user.css';


const User = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const { data, isLoading } = useGetEmployeeQuery(params.id || '')
  const [edit] = useEditEmployeeMutation()
  const [remove] = useRemoveEmployeeMutation()


  if (isLoading) {
    return <span>Louding...</span>
  }
  if (!data) {
    return <Navigate to={'/'} />
  }
  const removeUser = async () => {
    try {
      await remove(data.id)
      navigate('/employee')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='card_container'>
      <button onClick={() => navigate('/employee')} className='back'>back</button>
      <div className="card">
        <img src="/images/spice.png" alt="spice" />
        <h1>{data.firstName}</h1>
        <h1>{data.lastName}</h1>
        <h3>{data.address}</h3>
        <h4>{data.age}</h4>
        <div className="card_button">
          <button className='edit' onClick={() => navigate(`/employees/edit/${data.id}`)}>edit</button>
          <button className='delete' onClick={removeUser}>delete</button>
        </div>

      </div>

    </div>
  )
}

export default User;
