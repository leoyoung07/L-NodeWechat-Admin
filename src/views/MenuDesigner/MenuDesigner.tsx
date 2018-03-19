import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../interfaces';
import './MenuDesigner.scss';

interface IProps {
  loggedIn: boolean;
  user: {};
}

class MenuDesigner extends React.Component<IProps> {

  constructor (props: IProps) {
    super(props);
  }

  render() {
    return (
      <div>
        MenuDesigner
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
export default connect(mapStateToProps, mapDispatchToProps)(MenuDesigner);
