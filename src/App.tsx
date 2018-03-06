import * as React from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Header>Header</Header>
          <Layout>
            <Sider>Sider</Sider>
            <Content>Content</Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
