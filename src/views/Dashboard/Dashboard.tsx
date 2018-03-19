import { Breadcrumb } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../interfaces';
import './Dashboard.scss';

interface IProps {
  loggedIn: boolean;
  user: {};
}

class Dashboard extends React.Component<IProps> {

  constructor (props: IProps) {
    super(props);
  }

  render() {
    return (
      <div>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            Content
          </div>
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

function mapDispatchToProps(dispatch: Function) {
  return {
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
