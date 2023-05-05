import React, { useEffect } from 'react'
import Forms from './Form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../api/authSlice'
import { useAddEmployeeMutation } from '../app/services/employees'
import { Employee } from '@prisma/client'


const AddEmployee = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [addEmployee] = useAddEmployeeMutation()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [navigate, user])

  const addUser = async (data: Employee) => {

    try {
      await addEmployee(data).unwrap()

      navigate('/employee')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='form_container'>
      <Forms onFinish={addUser} title='ADD EMPLOYEE' />
    </div>
  )
}

export default AddEmployee
