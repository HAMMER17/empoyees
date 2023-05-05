import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEditEmployeeMutation, useGetEmployeeQuery } from '../app/services/employees';

import Forms from './Form'
import { Employee } from '@prisma/client'

const Edit = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const { data, isLoading } = useGetEmployeeQuery(params.id || '')
  const [edit] = useEditEmployeeMutation()
  console.log(params)

  if (isLoading) {
    return <span>Louding...</span>
  }
  if (!data) {
    return <Navigate to={'/'} />
  }

  const editUser = async (employee: Employee) => {
    try {
      const editEmpoyee = {
        ...data, ...employee
      }
      await edit(editEmpoyee).unwrap()
      navigate('/employee')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <Forms title='edit' onFinish={editUser} employee={data} />
    </div>
  )
}

export default Edit
