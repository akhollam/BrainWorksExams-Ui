import {Drawer, Form, Button, Col, Row, Input, Checkbox, Radio} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import React, {useState} from 'react';
import axios from 'axios';

const QuestionForm = (props) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const {examCode, customerId} = props;

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
    string: {
      min: '${label} must be at least ${min} character long',
    },
  };

  const showDrawer = () => {
    form.resetFields();
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const createQ = (values) => {
    console.log(values);

    let data = {};
    data.text = values.text;
    let options = [];
    data.options = options;
    options.push({
      answerText: values.option1,
      correct_answer: values.correctAnswer === 'option1',
    });
    options.push({
      answerText: values.option2,
      correct_answer: values.correctAnswer === 'option2',
    });
    options.push({
      answerText: values.option3,
      correct_answer: values.correctAnswer === 'option3',
    });
    options.push({
      answerText: values.option4,
      correct_answer: values.correctAnswer === 'option4',
    });

    axios({
      method: 'POST',
      url: '/customer/' + customerId + '/exam/' + examCode + '/question',
      responseType: 'stream',
      data: data,
    }).then(function (resp) {
      form.resetFields();
      props.updateQueList();
    });

    console.log(examCode);
    console.log(customerId);
  };

  return (
    <>
      <Button onClick={showDrawer} icon={<PlusOutlined />}>
        Add/Map New Question
      </Button>
      <Drawer
        title='Add new Question.'
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{paddingBottom: 80}}>
        <Form
          layout='vertical'
          validateMessages={validateMessages}
          hideRequiredMark
          form={form}
          onFinish={createQ}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='text'
                label={'Question text'}
                rules={[{required: true, min: 40}]}>
                <Input.TextArea
                  value={examCode}
                  rows={3}
                  placeholder='Question'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name={'option1'}
                label={'Option 1'}
                rules={[{required: true, min: 10}]}>
                <Input.TextArea rows={2} placeholder='Please enter option 1.' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='option2'
                label={'Option 2'}
                rules={[{required: true, min: 10}]}>
                <Input.TextArea rows={2} placeholder='Please enter option 2.' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='option3'
                label={'Option 3'}
                rules={[{required: true, min: 10}]}>
                <Input.TextArea rows={2} placeholder='Please enter option 3.' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='option4'
                label={'Option 4'}
                rules={[{required: true, min: 10}]}>
                <Input.TextArea rows={2} placeholder='Please enter option 4.' />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Form.Item
              layout='inline'
              name={'correctAnswer'}
              label={'Correct Option :'}
              rules={[{required: true}]}>
              <Radio.Group>
                <Row>
                  <Col span={6}>
                    <Radio value='option1'>1</Radio>
                  </Col>
                  <Col span={6}>
                    <Radio value='option2'>2</Radio>
                  </Col>
                  <Col span={6}>
                    <Radio value='option3'>3</Radio>
                  </Col>
                  <Col span={6}>
                    <Radio value='option4'>4</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Button type='primary' htmlType='submit'>
                Create
              </Button>
            </Col>
            <Col span={12}>
              <Button onClick={onClose}>Cancel</Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default QuestionForm;
