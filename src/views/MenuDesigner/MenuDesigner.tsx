import { Button, Col, Form, Icon, Input, Row, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { SelectValue } from 'antd/lib/select';
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
    e: React.FormEvent<HTMLElement>
  ) => void;
}

interface IRightPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  currentEditingButton: IButton | null;
  handleNameInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUrlInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeywordInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTypeSelectChange: (
    value: SelectValue, option: React.ReactElement<HTMLOptionElement> | React.ReactElement<HTMLOptionElement>[]
  ) => void;
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

interface ISelectWithLabelProps {
  label: string;
  value: string;
  options: Array<{
    value: string;
    text: string;
  }>;
  handleSelectChange: (
    value: SelectValue, option: React.ReactElement<HTMLOptionElement> | React.ReactElement<HTMLOptionElement>[]
  ) => void;
}

interface IInputWithLabelProps {
  label: string;
  value: string;
  visible: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IUpdateButtonProps {
  handleUpdateClick: () => void;
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
            <Button>
              {subButton.name}
            </Button>
            <Icon
              style={{cursor: 'pointer'}}
              type="minus-circle-o"
              onClick={e => {
                props.handleRemoveSubButtonClick(props.index, subIndex, e);
              }}
            />
          </li>
        );
      })}
    </ul>
    <Icon
      style={{cursor: 'pointer'}}
      type="plus-circle-o"
      onClick={e => {
        props.handleAddSubButtonClick(props.index);
      }}
    />
  </div>
);

const LeftPanel = (props: ILeftPanelProps) => (
  <div style={{textAlign: 'left'}}>
    <ul>
      {props.buttons.map((button, index) => {
        return (
          <li
            key={index}
          >
            <Button
              type="primary"
              onClick={e => {
                props.handleMenuButtonClick(index, null, e);
              }}
            >
              {button.name}
            </Button>
            <Icon
              style={{cursor: 'pointer'}}
              type="minus-circle-o"
              onClick={e => {
                props.handleRemoveButtonClick(index);
              }}
            />
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
      <Icon
        style={{cursor: 'pointer'}}
        type="plus-circle-o"
        onClick={e => {
          props.handleAddButtonClick();
        }}
      />
    </div>
  </div>
);

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SelectWithLabel = (props: ISelectWithLabelProps) => (
  <FormItem label={props.label} {...formItemLayout}>
    <Select value={props.value} onChange={props.handleSelectChange}>
      {props.options.map((option, index) => {
        return (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        );
      })}
    </Select>
  </FormItem>
);

const InputWithLabel = (props: IInputWithLabelProps) => {
  if (props.visible) {
    return (
      <FormItem label={props.label} {...formItemLayout}>
        <Input
          type="text"
          value={props.value}
          onChange={props.handleInputChange}
        />
      </FormItem>
    );
  } else {
    return null;
  }
};

const UpdateButton = (props: IUpdateButtonProps) => {
  return (
    <FormItem {...tailFormItemLayout}>
      <Button onClick={props.handleUpdateClick}>update</Button>
    </FormItem>
  );
};

const RightPanel = (props: IRightPanelProps) => (
  <Form style={{textAlign: 'left'}}>
    <InputWithLabel
      label="name"
      value={props.currentEditingButton ? props.currentEditingButton.name : ''}
      visible={true}
      handleInputChange={props.handleNameInputChange}
    />
    <SelectWithLabel
      label="type"
      options={buttonTypes}
      value={
        props.currentEditingButton
          ? props.currentEditingButton.type
          : ButtonType.VIEW
      }
      handleSelectChange={props.handleTypeSelectChange}
    />
    <InputWithLabel
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
    <InputWithLabel
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
    <UpdateButton
      handleUpdateClick={props.handleUpdateClick}
    />
  </Form>
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
    e: React.FormEvent<HTMLElement>
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

  private handleTypeSelectChange(
    value: SelectValue, option: React.ReactElement<HTMLOptionElement> | React.ReactElement<HTMLOptionElement>[]
  ) {
    if (!this.state.currentEditingButton) {
      return;
    }
    const currentEditingButton = _.cloneDeep(this.state.currentEditingButton);
    currentEditingButton.type = value.toString();
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
