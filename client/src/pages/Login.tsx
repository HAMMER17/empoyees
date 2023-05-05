import { Link, useNavigate } from 'react-router-dom'
import '../style/login.css'
import { UserData, useLoginMutation } from '../app/services/auth'

import { Button, Form, Input } from 'antd';

const Login = () => {
  const navigate = useNavigate()
  const [loginUser] = useLoginMutation()

  const isLogin = async (data: UserData) => {
    try {
      await loginUser(data).unwrap()
      navigate('/employee')
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
          minWidth: 600, border: '1px solid black', height: 450,
          padding: 30, display: 'flex', justifyContent: 'center', flexDirection: 'column', borderRadius: 20,
          background: 'black', alignItems: 'center',
        }}
        initialValues={{ remember: true }}
        onFinish={isLogin}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1>LOGIN</h1>
        <Form.Item
          // label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
          style={{ color: 'white' }}
        >
          {/* <h3>Login</h3> */}
          <Input className='input' placeholder='Login' />
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
            LOGIN
          </Button>
        </Form.Item>
        <p>Have login? <Link to={'/register'}>register</Link></p>
      </Form>
    </div>
  );

  // return (
  //   <form className='form' onSubmit={isLogin}>
  //     <h2>LOGIN</h2>
  //     <input name='email' type="text" placeholder='Email' />
  //     <input name='password' type="text" placeholder='Password' />

  //     <button type='submit'>login</button>
  //     <p>Not have login ?<span><Link to={'/register'}>Register</Link></span></p>
  //   </form>
  // )
}

export default Login;
