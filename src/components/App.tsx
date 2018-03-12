import { Layout } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { IState } from '../interfaces';
import '../style/App.scss';
const { Header, Footer, Sider, Content } = Layout;

interface IProps {
  loggedIn: boolean;
  user: {};
}

class App extends React.Component<IProps> {
  render() {

    if (!this.props.loggedIn) {
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

function mapStateToProps(state: IState) {
  return {
    loggedIn: state.authentication.loggedIn,
    user: {}
  };
}

export default connect(mapStateToProps)(App);
