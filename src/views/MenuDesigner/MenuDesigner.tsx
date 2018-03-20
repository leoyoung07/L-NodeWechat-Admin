import { Button, List, Popover } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../interfaces';
import './MenuDesigner.scss';

const ButtonGroup = Button.Group;

const subMenus = (
  <List
    dataSource={[1, 2, 3]}
    renderItem={(item: string) => (
      <List.Item>{'SubMenu ' + item}</List.Item>
    )}
  />
);

interface IProps {
  user: {};
}

class MenuDesigner extends React.Component<IProps> {

  constructor (props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className="menu-designer__wrapper">
        <ButtonGroup>
          {[1, 2, 3].map((value) => (
            <Popover
              key={value}
              content={<div>{subMenus}</div>}
              placement="top"
              trigger="click"
            >
              <Button size="large">Click me</Button>
            </Popover>
          ))}
        </ButtonGroup>
      </div>
    );
  }
}

function mapStateToProps(state: IState) {
  return {
    user: {}
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuDesigner);
