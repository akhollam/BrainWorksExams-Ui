import {
  DeleteOutlined,
  QuestionCircleOutlined,
  RightCircleOutlined,
} from '@ant-design/icons';
import {
  PageHeader,
  Button,
  List,
  Card,
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Typography,
  message,
  Divider,
} from 'antd';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {useNavigate, Link} from 'react-router-dom';

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const CustomerExams: React.FC = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {Title} = Typography;

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/customer/' + id + '/list-exams',
      responseType: 'stream',
    }).then(function (resp) {
      setData(resp.data);
    });
  }, [id, refresh]);

  const confirmDelete = (examCode) => {
    axios({
      method: 'DELETE',
      url: '/customer/' + id + '/exam/' + examCode,
    })
      .then(function (resp) {
        setRefresh(!refresh);
        message.success('Exam has been deleted successfully');
      })
      .catch(function (error) {
        console.log(error);
        message.error('Error occurred deleting the exam');
      });
  };

  const createExam = (values: any) => {
    axios({
      method: 'POST',
      url: '/customer/' + id + '/exam',
      responseType: 'stream',
      data: values,
    }).then(function (resp) {
      setRefresh(!refresh);
      form.resetFields();
      message.info('Exam has been created successfully');
    });
  };

  return (
    <>
      <PageHeader
        onBack={() => navigate(-1)}
        ghost={false}
        title='Exams'
        subTitle='Below are the list of the exams under your customer'
        extra={[
          <Button key='1' type='primary'>
            <Link to={'/customers/' + id + '/add'}>Add Exam</Link>
          </Button>,
        ]}
      />
      <hr />
      <Row>
        <Col span={12}>
          <List
            grid={{gutter: 8, column: 2}}
            dataSource={data}
            renderItem={(item) => (
              <List.Item title={item.name}>
                <Card
                  title={
                    <strong style={{cursor: 'pointer'}}>{item.name}</strong>
                  }
                  extra={[
                    <Button
                      shape='default'
                      icon={<RightCircleOutlined />}
                      key='1'
                      onClick={() => {
                        navigate(
                          '/customers/' +
                            id +
                            '/' +
                            item.global_exam_code +
                            '/questions'
                        );
                      }}
                    />,
                  ]}
                  actions={[
                    <Popconfirm
                      title='Are you sure to delete this exam？'
                      okText='Yes'
                      cancelText='No'
                      onConfirm={() => confirmDelete(item.global_exam_code)}
                      icon={<QuestionCircleOutlined style={{color: 'red'}} />}>
                      <Button
                        danger
                        shape='circle'
                        icon={<DeleteOutlined />}
                        key='3'
                      />
                    </Popconfirm>,
                  ]}>
                  <p>
                    <strong>Description : </strong>
                    {item.description}
                  </p>
                  <p>
                    <strong>Duration in Minutes : </strong>
                    {item.duration_in_minutes}
                  </p>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Title style={{textAlign: 'center'}} level={3}>
            Create Exam
          </Title>
          <Form
            form={form}
            {...layout}
            onFinish={createExam}
            validateMessages={validateMessages}>
            <Form.Item
              name={['name']}
              label='Exam Name'
              rules={[{required: true, min: 20}]}>
              <Input />
            </Form.Item>

            <Form.Item
              name={['duration_in_minutes']}
              label='Duration'
              rules={[{type: 'number', min: 0, max: 120}]}>
              <InputNumber />
            </Form.Item>

            <Form.Item
              name={['description']}
              label='Description'
              rules={[{required: true, min: 100}]}>
              <Input.TextArea />
            </Form.Item>

            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
              <Button type='primary' htmlType='submit'>
                Create Exam
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CustomerExams;
