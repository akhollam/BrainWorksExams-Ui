import {Divider, Layout, Menu} from 'antd';
import {Content, Footer, Header} from 'antd/lib/layout/layout';
import {Link, Outlet} from 'react-router-dom';
import './App.css';

function App(props: any) {
  return (
    <Layout>
      {props.isAuthenticated() && (
        <Header>
          <Menu theme='dark' mode='horizontal' defaultActiveFirst={true}>
            <Menu.Item>
              <Link to='/home'>Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/login'>Login</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/contact-us'>Contact Us</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/customers'>Customers</Link>
            </Menu.Item>
          </Menu>
        </Header>
      )}
      <Content
        style={{
          margin: 'auto',
          minHeight: 570,
          width: '98%',
          padding: '25px',
          textAlign: 'left',
        }}>
        <Outlet />
      </Content>
      <Footer style={{textAlign: 'center'}}>
        <Divider />
        Brain works exams.{' '}
      </Footer>
    </Layout>
  );
}

export default App;
