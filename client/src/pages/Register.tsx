import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd';
import { useRegisterMutation } from '../app/services/auth';
import { User } from '@prisma/client';

type RegisterProps = Omit<User, 'id'> & { confirmPasswopd: string }

const Register = () => {
  const navigate = useNavigate()
  const [register] = useRegisterMutation()
  const isRegister = async (data: RegisterProps) => {
    try {
      await register(data).unwrap()
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          minWidth: 600, border: '1px solid black', height: 550,
          padding: 30, display: 'flex', justifyContent: 'center', flexDirection: 'column', borderRadius: 20,
          background: 'black', alignItems: 'center',
        }}
        initialValues={{ remember: true }}
        onFinish={isRegister}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1>REGISTER</h1>
        <Form.Item
          // label="Email"
          name="name"
          rules={[{ required: true, message: 'Please input your email!' }]}
          style={{ color: 'white' }}
        >
          {/* <h3>Name</h3> */}
          <Input className='input' placeholder='Name' />
        </Form.Item>
        <Form.Item
          // label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
          style={{ color: 'white' }}
        >
          {/* <h3>Login</h3> */}
          <Input className='input' placeholder='Email' />
        </Form.Item>

        <Form.Item
          // label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          className='label'
        >
          {/* <h3 style={{ color: 'white' }}>Password</h3> */}
          <Input.Password className='input' placeholder='Password' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 1, span: 10 }}>
          <Button type="primary" htmlType="submit">
            REGISTER
          </Button>
        </Form.Item>
        <p>Have already register? <Link to={'/login'}>login</Link></p>
      </Form>
    </div>

  )
}

export default Register
