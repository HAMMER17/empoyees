import { Employee } from "@prisma/client"
import { Form, Input } from "antd"
import '../style/form.css'


type PropsForm<T> = {
  onFinish: (value: T) => void
  title: string
  employee?: T
}

const Forms = ({ onFinish, employee, title }: PropsForm<Employee>) => {
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (

    <div className="forms">
      <Form onFinish={onFinish} initialValues={employee}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: 500, flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
        <h3>{title}</h3>
        <Form.Item name="firstName">
          <Input type="text" placeholder="firstName" />
        </Form.Item>
        <Form.Item name="lastName">
          <Input type="text" placeholder="lastName" />
        </Form.Item>
        <Form.Item name="age">
          <Input type="text" placeholder="age" />
        </Form.Item>
        <Form.Item name="address">
          <Input type="text" placeholder="address" />
        </Form.Item>
        <button type="submit" >added</button>
      </Form>
    </div>


  )
}

export default Forms;
