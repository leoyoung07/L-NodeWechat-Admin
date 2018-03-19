import { Icon, Layout, Menu } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { IAction, IState } from '../../interfaces';
import './App.scss';
const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

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
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible={true}
          // collapsed={this.state.collapsed}
          // onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Link to="/dashboard">
                <Icon type="dashboard" />
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/menu_designer">
                <Icon type="ant-design" />
                <span>Menu Designer</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div className="right">
              <Link to="/login">logout</Link>
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Footer
          </Footer>
        </Layout>
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
