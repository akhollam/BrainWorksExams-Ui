import {Button, Checkbox, Divider, Form, Input} from 'antd';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Login() {
  const [userName, setUserName] = useState(0);

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/customer/list-customer',
      responseType: 'stream',
    }).then(function (resp) {
      console.log(resp);
    });
  }, []);

  const onFinish = (values: any) => {
    console.log('Success:', values);
    setUserName(userName + 1);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div>username : {userName}</div>
      <Form
        style={{
          borderRadius: '10px',
          padding: '40px',
          background: 'white',
          width: '400px',
          margin: '40px',
        }}
        name='basic'
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'>
        <Form.Item
          label='Username'
          name='username'
          rules={[{required: true, message: 'Please input your username!'}]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{required: true, message: 'Please input your password!'}]}>
          <Input.Password />
        </Form.Item>

        <Divider />

        <Form.Item name='remember' valuePropName='checked'>
          <Checkbox>Remember me</Checkbox>
          <Button type='primary' htmlType='submit' style={{float: 'right'}}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
