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
  subButtons: Array<IButton>;

  index: number;

  subIndex: number | null;
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

interface ILeftPanelProps {
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

interface IRightPanelProps {
  currentEditingButton: IButton | null;
  handleNameInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUrlInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTypeSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleUpdateClick: () => void;
}

const LeftPanel = (props: ILeftPanelProps) => (
  <div>
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
                props.handleAddSubButtonClick(index);
              }}
              disabled={button.subButtons.length >= 5}
            >
              +
            </button>
            <button
              onClick={e => {
                props.handleRemoveButtonClick(index);
              }}
            >
              -
            </button>
            <ul>
              {(props.buttons[index].subButtons as Array<IButton>).map(
                (subButton, subIndex) => {
                  return (
                    <li
                      key={subIndex}
                      onClick={e => {
                        props.handleMenuButtonClick(index, subIndex, e);
                      }}
                    >
                      {subButton.name}
                      <button
                        onClick={e => {
                          props.handleRemoveSubButtonClick(index, subIndex, e);
                        }}
                      >
                        -
                      </button>
                    </li>
                  );
                }
              )}
            </ul>
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

const RightPanel = (props: IRightPanelProps) => (
  <div>
    <div>
      <label>name: </label>
      <input
        type="text"
        value={
          props.currentEditingButton ? props.currentEditingButton.name : ''
        }
        onChange={props.handleNameInputChange}
      />
    </div>
    <div>
      <label>type: </label>
      <select
        value={
          props.currentEditingButton
            ? props.currentEditingButton.type
            : ButtonType.VIEW
        }
        onChange={props.handleTypeSelectChange}
      >
        {buttonTypes.map((type, index) => {
          return (
            <option key={index} value={type.value}>
              {type.text}
            </option>
          );
        })}
      </select>
    </div>
    <div>
      <label>url: </label>
      <input
        type="text"
        value={
          props.currentEditingButton
            ? props.currentEditingButton.url
              ? props.currentEditingButton.url
              : ''
            : ''
        }
        onChange={props.handleUrlInputChange}
      />
    </div>
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
    this.handleTypeSelectChange = this.handleTypeSelectChange.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around'
        }}
      >
        <LeftPanel
          buttons={this.state.buttons}
          handleAddButtonClick={this.handleAddButtonClick}
          handleAddSubButtonClick={this.handleAddSubButtonClick}
          handleMenuButtonClick={this.handleMenuButtonClick}
          handleRemoveButtonClick={this.handleRemoveButtonClick}
          handleRemoveSubButtonClick={this.handleRemoveSubButtonClick}
        />
        <RightPanel
          currentEditingButton={this.state.currentEditingButton}
          handleNameInputChange={this.handleNameInputChange}
          handleUrlInputChange={this.handleUrlInputChange}
          handleTypeSelectChange={this.handleTypeSelectChange}
          handleUpdateClick={this.handleUpdateClick}
        />
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
        url: 'https://',
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
    let button = buttons[index];
    if (subIndex !== null) {
      button = button.subButtons[subIndex];
    }
    for (const key in currentEditingButton) {
      if (currentEditingButton.hasOwnProperty(key)) {
        button[key] = currentEditingButton[key];
      }
    }
    this.setState({
      buttons
    });
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
