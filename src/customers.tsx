import {Card, List} from 'antd';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const Customers: React.FC = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/customer/list-customer',
      responseType: 'stream',
    }).then(function (resp) {
      setData(resp.data);
      console.log(resp);
    });
  }, []);

  const customerSelected = (item) => {
    let url = '/customers/' + item.id;
    navigate(url);
  };

  return (
    <List
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card
            hoverable={true}
            title={item.name}
            onClick={() => customerSelected(item)}>
            {item.description}
          </Card>
        </List.Item>
      )}
    />
  );
};

export default Customers;
