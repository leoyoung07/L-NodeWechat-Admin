import { Button, List, Modal, Popover } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import './MenuDesigner.scss';

const ButtonGroup = Button.Group;

interface IProps {
  user: {};
}

interface IState {
  modalVisible: boolean;
  currentEditingItem: string | null;
}

class MenuDesigner extends React.Component<IProps, IState> {

  constructor (props: IProps) {
    super(props);
    this.state = {
      modalVisible: false,
      currentEditingItem: null
    };
    this.handleModalCancel = this.handleModalCancel.bind(this);
    this.handleModalOK = this.handleModalOK.bind(this);
    this.handleSubMenuClick = this.handleSubMenuClick.bind(this);
  }

  handleSubMenuClick (item: string) {
    this.setState({
      modalVisible: true,
      currentEditingItem: item
    });
  }

  handleModalOK () {
    this.setState({
      modalVisible: false,
      currentEditingItem: null
    });
  }

  handleModalCancel () {
    this.setState({
      modalVisible: false,
      currentEditingItem: null
    });
  }
  render() {
    const subMenus = (
      <List
        dataSource={[1, 2, 3]}
        renderItem={(item: string) => (
          <List.Item>
            <div className="menu-designer__sub-menu" onClick={() => { this.handleSubMenuClick(item); }}>
              {'SubMenu ' + item}
            </div>
          </List.Item>
        )}
      />
    );
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
        <Modal
          visible={this.state.modalVisible}
          onOk={this.handleModalOK}
          onCancel={this.handleModalCancel}
        >
          <div>
            {this.state.currentEditingItem}
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state: {}) {
  return {
    user: {}
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuDesigner);
