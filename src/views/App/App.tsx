import { Layout } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { IAction, IState } from '../../interfaces';
import './App.scss';
const { Header, Footer, Sider, Content } = Layout;

interface IProps {
  loggedIn: boolean;
  user: {};
}

class App extends React.Component<IProps> {
  constructor (props: IProps) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Layout>
          <Header>
            Header
            <Link to="/login">logout</Link>
          </Header>
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

function mapDispatchToProps(dispatch: (action: IAction) => void) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
