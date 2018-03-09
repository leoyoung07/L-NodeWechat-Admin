import React from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Redirect } from 'react-router-dom';
import {  } from 'redux';
import '../style/App.scss';

interface IProps {

}
interface IState {
  loggedIn: boolean;
}

class App extends React.Component<IProps, IState> {

  constructor (props: IProps) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }
  render() {

    if (!this.state.loggedIn) {
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
