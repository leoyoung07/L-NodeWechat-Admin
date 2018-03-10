import React from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Redirect } from 'react-router-dom';
import { store } from '../helpers/store';
import '../style/App.scss';

interface IProps {

}
interface IState {

}

class App extends React.Component<IProps, IState> {
  render() {

    if (!store.getState().authentication.loggedIn) {
      return <Redirect to="/login"/>;
    }
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
