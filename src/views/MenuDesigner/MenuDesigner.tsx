import { Col, Row } from 'antd';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import './MenuDesigner.scss';

interface IProps {
  user: {};
}

interface IState {
  currentEditingButton: IButton | null;
  buttons: Array<IButton>;
}

interface IButton {
  id: number;
  name: string;
  type: string;
  url?: string;
  keyword?: string;
  subButtons: Array<IButton>;

  index: number;

  subIndex: number | null;
}

interface ILeftPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  buttons: Array<IButton>;
  handleAddButtonClick: () => void;
  handleAddSubButtonClick: (index: number) => void;
  handleRemoveButtonClick: (index: number) => void;
  handleRemoveSubButtonClick: (
    index: number,
    subIndex: number,
    e: React.MouseEvent<HTMLElement>
  ) => void;
  handleMenuButtonClick: (
    index: number,
    subIndex: number | null,
    e: React.MouseEvent<HTMLElement>
  ) => void;
}

interface IRightPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  currentEditingButton: IButton | null;
  handleNameInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUrlInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeywordInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTypeSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleUpdateClick: () => void;
}

interface ISubButtonsProps {
  index: number;
  subButtons: Array<IButton>;
  handleAddSubButtonClick: (index: number) => void;
  handleRemoveSubButtonClick: (
    index: number,
    subIndex: number,
    e: React.MouseEvent<HTMLElement>
  ) => void;
  handleMenuButtonClick: (
    index: number,
    subIndex: number | null,
    e: React.MouseEvent<HTMLElement>
  ) => void;
}

interface ISelectProps {
  label: string;
  value: string;
  options: Array<{
    value: string;
    text: string;
  }>;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface IInputProps {
  label: string;
  value: string;
  visible: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

enum ButtonType {
  VIEW = 'view',
  BUTTON_GROUP = 'button_group',
  CLICK = 'click'
}

const buttonTypes = [
  {
    value: ButtonType.VIEW,
    text: '打开链接'
  },
  {
    value: ButtonType.CLICK,
    text: '自动回复'
  },
  {
    value: ButtonType.BUTTON_GROUP,
    text: '父级按钮'
  }
];

const SubButtons = (props: ISubButtonsProps) => (
  <div>
    <ul>
      {props.subButtons.map((subButton, subIndex) => {
        return (
          <li
            key={subIndex}
            onClick={e => {
              props.handleMenuButtonClick(props.index, subIndex, e);
            }}
          >
            {subButton.name}
            <button
              onClick={e => {
                props.handleRemoveSubButtonClick(props.index, subIndex, e);
              }}
            >
              -
            </button>
          </li>
        );
      })}
    </ul>
    <button
      onClick={e => {
        props.handleAddSubButtonClick(props.index);
      }}
      disabled={props.subButtons.length >= 5}
    >
      +
    </button>
  </div>
);

const LeftPanel = (props: ILeftPanelProps) => (
  <div style={{textAlign: 'left'}}>
    <ul>
      {props.buttons.map((button, index) => {
        return (
          <li
            key={index}
            onClick={e => {
              props.handleMenuButtonClick(index, null, e);
            }}
          >
            {button.name}
            <button
              onClick={e => {
                props.handleRemoveButtonClick(index);
              }}
            >
              -
            </button>
            <SubButtons
              index={index}
              subButtons={button.subButtons}
              handleAddSubButtonClick={props.handleAddSubButtonClick}
              handleMenuButtonClick={props.handleMenuButtonClick}
              handleRemoveSubButtonClick={props.handleRemoveSubButtonClick}
            />
          </li>
        );
      })}
    </ul>
    <div>
      <button
        onClick={e => {
          props.handleAddButtonClick();
        }}
        disabled={props.buttons.length >= 3}
      >
        +
      </button>
    </div>
  </div>
);

const Select = (props: ISelectProps) => (
  <div>
    <label>{props.label}: </label>
    <select value={props.value} onChange={props.handleSelectChange}>
      {props.options.map((option, index) => {
        return (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        );
      })}
    </select>
  </div>
);

const Input = (props: IInputProps) => {
  if (props.visible) {
    return (
      <div>
        <label>{props.label}: </label>
        <input
          type="text"
          value={props.value}
          onChange={props.handleInputChange}
        />
      </div>
    );
  } else {
    return null;
  }
};

const RightPanel = (props: IRightPanelProps) => (
  <div style={{textAlign: 'left'}}>
    <Input
      label="name"
      value={props.currentEditingButton ? props.currentEditingButton.name : ''}
      visible={true}
      handleInputChange={props.handleNameInputChange}
    />
    <Select
      label="type"
      options={buttonTypes}
      value={
        props.currentEditingButton
          ? props.currentEditingButton.type
          : ButtonType.VIEW
      }
      handleSelectChange={props.handleTypeSelectChange}
    />
    <Input
      label="url"
      value={
        props.currentEditingButton && props.currentEditingButton.url
          ? props.currentEditingButton.url
          : ''
      }
      handleInputChange={props.handleUrlInputChange}
      visible={
        !!(
          props.currentEditingButton &&
          props.currentEditingButton.type === ButtonType.VIEW
        )
      }
    />
    <Input
      label="keyword"
      value={
        props.currentEditingButton && props.currentEditingButton.keyword
          ? props.currentEditingButton.keyword
          : ''
      }
      handleInputChange={props.handleKeywordInputChange}
      visible={
        !!(
          props.currentEditingButton &&
          props.currentEditingButton.type === ButtonType.CLICK
        )
      }
    />
    <div>
      <button onClick={props.handleUpdateClick}>update</button>
    </div>
  </div>
);

class MenuDesigner extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentEditingButton: null,
      buttons: []
    };

    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleAddSubButtonClick = this.handleAddSubButtonClick.bind(this);
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    this.handleRemoveSubButtonClick = this.handleRemoveSubButtonClick.bind(
      this
    );
    this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this);

    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleUrlInputChange = this.handleUrlInputChange.bind(this);
    this.handleKeywordInputChange = this.handleKeywordInputChange.bind(this);
    this.handleTypeSelectChange = this.handleTypeSelectChange.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }

  render() {
    return (
      <div>
        <Row type="flex" justify="space-around" align="middle" style={{textAlign: 'center'}}>
          <Col span={12}>
            <LeftPanel
              buttons={this.state.buttons}
              handleAddButtonClick={this.handleAddButtonClick}
              handleAddSubButtonClick={this.handleAddSubButtonClick}
              handleMenuButtonClick={this.handleMenuButtonClick}
              handleRemoveButtonClick={this.handleRemoveButtonClick}
              handleRemoveSubButtonClick={this.handleRemoveSubButtonClick}
            />
          </Col>
          <Col span={12} style={{borderLeft: '1px solid #696969'}}>
            <RightPanel
              currentEditingButton={this.state.currentEditingButton}
              handleNameInputChange={this.handleNameInputChange}
              handleUrlInputChange={this.handleUrlInputChange}
              handleKeywordInputChange={this.handleKeywordInputChange}
              handleTypeSelectChange={this.handleTypeSelectChange}
              handleUpdateClick={this.handleUpdateClick}
            />
          </Col>
        </Row>
      </div>
    );
  }

  private handleAddButtonClick() {
    let buttons = _.cloneDeep(this.state.buttons);
    if (buttons.length < 3) {
      const nextButtonId = this.getNextButtonId(buttons);
      const newButton = {
        id: nextButtonId,
        name: 'new button ' + nextButtonId,
        type: ButtonType.BUTTON_GROUP,
        subButtons: [],
        index: buttons.length,
        subIndex: null
      };
      buttons.push(newButton);
      this.setState({
        buttons
      });
    }
  }

  private handleAddSubButtonClick(index: number) {
    const buttons = _.cloneDeep(this.state.buttons);
    let subButtons = buttons[index].subButtons as Array<IButton>;
    if (subButtons.length < 5) {
      const nextButtonId = this.getNextButtonId(subButtons);
      subButtons.push({
        id: nextButtonId,
        name: 'new sub-button ' + nextButtonId,
        type: ButtonType.VIEW,
        subButtons: [],
        index: index,
        subIndex: subButtons.length
      });
      buttons[index].subButtons = subButtons;
      this.setState({
        buttons
      });
    }
  }

  private handleRemoveButtonClick(index: number) {
    const buttons = _.cloneDeep(this.state.buttons);
    if (buttons.length > 0) {
      buttons.splice(index, 1);
      this.setState({
        buttons
      });
    }
  }

  private handleRemoveSubButtonClick(
    index: number,
    subIndex: number,
    e: React.MouseEvent<HTMLElement>
  ) {
    e.stopPropagation();
    const buttons = _.cloneDeep(this.state.buttons);
    const subButtons = buttons[index].subButtons;
    if (subButtons.length > 0) {
      subButtons.splice(subIndex, 1);
      buttons[index].subButtons = subButtons;
      this.setState({
        buttons
      });
    }
  }

  private handleMenuButtonClick(
    index: number,
    subIndex: number | null,
    e: React.MouseEvent<HTMLElement>
  ) {
    e.stopPropagation();
    const buttons = _.cloneDeep(this.state.buttons);
    let button = buttons[index];
    if (subIndex !== null) {
      button = button.subButtons[subIndex];
    }
    this.setState({
      currentEditingButton: button
    });
  }

  private handleUpdateClick() {
    if (!this.state.currentEditingButton) {
      return;
    }
    const buttons = _.cloneDeep(this.state.buttons);
    const currentEditingButton = _.cloneDeep(this.state.currentEditingButton);
    const index = currentEditingButton.index;
    const subIndex = currentEditingButton.subIndex;
    let button;
    if (subIndex === null) {
      button = buttons[index];
    } else {
      button = buttons[index].subButtons[subIndex];
    }
    if (button) {
      for (const key in currentEditingButton) {
        if (currentEditingButton.hasOwnProperty(key)) {
          button[key] = currentEditingButton[key];
        }
      }
      this.setState({
        buttons
      });
    }
  }

  private handleNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!this.state.currentEditingButton) {
      return;
    }
    const currentEditingButton = _.cloneDeep(this.state.currentEditingButton);
    currentEditingButton.name = e.target.value;
    this.setState({
      currentEditingButton
    });
  }

  private handleUrlInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!this.state.currentEditingButton) {
      return;
    }
    const currentEditingButton = _.cloneDeep(this.state.currentEditingButton);
    currentEditingButton.url = e.target.value;
    this.setState({
      currentEditingButton
    });
  }

  private handleKeywordInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!this.state.currentEditingButton) {
      return;
    }
    const currentEditingButton = _.cloneDeep(this.state.currentEditingButton);
    currentEditingButton.keyword = e.target.value;
    this.setState({
      currentEditingButton
    });
  }

  private handleTypeSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (!this.state.currentEditingButton) {
      return;
    }
    const currentEditingButton = _.cloneDeep(this.state.currentEditingButton);
    currentEditingButton.type = e.target.value;
    this.setState({
      currentEditingButton
    });
  }

  private getNextButtonId(buttons: Array<IButton>) {
    return buttons[buttons.length - 1] ? buttons[buttons.length - 1].id + 1 : 0;
  }
}

function mapStateToProps(state: {}) {
  return {
    user: {}
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuDesigner);
