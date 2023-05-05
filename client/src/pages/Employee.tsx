
import Header from '../components/Header'
import { Table } from 'antd'
import { useGetEmployeesAllQuery } from '../app/services/employees'
import type { ColumnsType } from 'antd/es/table';
import { Employee } from '@prisma/client'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../api/authSlice';

import { useEffect } from 'react';

const columns: ColumnsType<Employee> = [
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName"
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
]

const Employees = () => {
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  const { data, isLoading } = useGetEmployeesAllQuery()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [navigate, user])
  const addUser = () => navigate('/employees/add')
  return (
    <div>
      <Header />
      <div className='table'>
        <button onClick={addUser}>added</button>
        <Table dataSource={data}
          loading={isLoading}
          columns={columns}
          pagination={false}
          rowKey={(record) => record.id}
          onRow={((employee) => {
            return {
              onClick: () => navigate(`/employees/${employee.id}`)
            }
          }
          )}
        />
      </div>

    </div>
  )
}

export default Employees;
