import {
  Button,
  Checkbox,
  Descriptions,
  message,
  PageHeader,
  Skeleton,
  Space,
  Spin,
  Table,
  Tag,
} from 'antd';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {useNavigate} from 'react-router-dom';
import {
  CloudUploadOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import QuestionForm from './QuestionForm';

const columns = [
  {
    title: 'Question',
    dataIndex: 'text',
    key: 'text',
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    render: (tags) => (
      <>
        {tags.map((tag, index) => {
          return (
            <Tag color={'geekblue'} key={tag.name + '_' + index}>
              {tag.name.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const CustomerExamsQuestions: React.FC = () => {
  const [data, setData] = useState([]);
  const [exam, setExam] = useState({});
  const [spinning, setSpinning] = useState(false);
  const [examLoading, setExamLoading] = useState(true);

  const {id, examCode} = useParams();
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/customer/' + id + '/exam/' + examCode,
    }).then(function (resp) {
      setExam(resp.data);
      setExamLoading(false);
    });

    setSpinning(true);
    axios({
      method: 'GET',
      url: '/customer/' + id + '/exam/' + examCode + '/list-questions',
    }).then(function (resp) {
      setData(resp.data);
      setSpinning(false);
    });
  }, [id, examCode, refresh]);

  const updateQueList = () => {
    setRefresh(!refresh);
  };

  const publishExam = () => {
    axios({
      method: 'POST',
      url: '/customer/' + id + '/exam/' + examCode + '/publish',
    }).then(function (resp) {
      message.success('Exam has been published successfully. ');
    });
  };

  const uploadQuestions = () => {};

  return (
    <>
      <Skeleton active loading={examLoading} />
      <PageHeader
        onBack={() => navigate(-1)}
        title={exam['name']}
        extra={[
          <QuestionForm
            customerId={id}
            examCode={examCode}
            updateQueList={updateQueList}
          />,
          <Button onClick={uploadQuestions} icon={<UploadOutlined />}>
            Upload Questions.
          </Button>,
          <Button
            type='primary'
            onClick={publishExam}
            icon={<CloudUploadOutlined />}>
            {exam['publish'] ? 'withhold' : 'Publish Exam'}
          </Button>,
        ]}>
        <Descriptions size='small' column={3}>
          <Descriptions.Item label={<b>Exam Duration</b>}>
            {exam['duration_in_minutes']} minutes
          </Descriptions.Item>
          <Descriptions.Item label={<b>Creation Time</b>}>
            {exam['created_datetime']}
          </Descriptions.Item>
          <br />
          <Descriptions.Item label={<b>Description</b>}>
            {exam['description']}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <hr />
      <Space size='middle'>
        <Spin tip='Loading...' spinning={spinning}>
          <Table
            pagination={{position: ['bottomRight'], pageSize: 150}}
            scroll={{y: 400}}
            bordered={true}
            dataSource={data}
            columns={columns}
            size={'small'}
            rowKey='global_question_code'
            expandable={{
              expandedRowRender: (record, index) => (
                <div
                  className={record.global_question_code + '_' + index}
                  key={record.global_question_code + '_' + index}>
                  {record.options.map((op) => {
                    return (
                      <div style={{paddingLeft: '55px'}}>
                        <p key={op.id}>
                          <Checkbox
                            name={record.global_question_code + '' + op.id}
                            key={record.global_question_code + '' + op.id}
                            onChange={() => {}}
                            checked={op.correct_answer}>
                            {op.answerText}
                            <br />
                          </Checkbox>
                        </p>
                      </div>
                    );
                  })}
                </div>
              ),
            }}
          />
        </Spin>
      </Space>
    </>
  );
};

export default CustomerExamsQuestions;
