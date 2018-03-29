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

class MenuDesigner extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentEditingButton: null,
      buttons: []
    };

    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleUrlInputChange = this.handleUrlInputChange.bind(this);
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    // tslint:disable-next-line:no-console
    console.log(prevState);
  }

  render() {
    return (
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
        <div>
          <ul>
            {this.state.buttons.map((button, index) => {
              return (
                <li
                  key={index}
                  onClick={this.handleMenuButtonClick.bind(this, index, null)}
                >
                  {button.name}
                  <button
                    onClick={this.handleAddSubButtonClick.bind(
                      this,
                      index
                    )}
                    disabled={button.subButtons.length >= 5}
                  >
                    +
                  </button>
                  <button
                    onClick={this.handleRemoveButtonClick.bind(
                      this,
                      index
                    )}
                  >
                    -
                  </button>
                  <ul>
                    {(this.state.buttons[index].subButtons as Array<
                      IButton
                    >).map((subButton, subIndex) => {
                      return (
                        <li
                          key={subIndex}
                          onClick={this.handleMenuButtonClick.bind(this, index, subIndex)}
                        >
                          {subButton.name}
                          <button
                            onClick={this.handleRemoveSubButtonClick.bind(
                              this,
                              index,
                              subIndex
                            )}
                          >
                            -
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
          <div>
            <button
              onClick={() => {
                this.handleAddButtonClick();
              }}
              disabled={this.state.buttons.length >= 3}
            >
              +
            </button>
          </div>
        </div>
        <div>
          <div>
            <label>name: </label>
            <input
              type="text"
              value={this.state.currentEditingButton ? this.state.currentEditingButton.name : ''}
              onChange={this.handleNameInputChange}
            />
          </div>
          <div>
            <label>type: </label>
            <select />
          </div>
          <div>
            <label>url: </label>
            <input
              type="text"
              value={this.state.currentEditingButton ? this.state.currentEditingButton.url : ''}
              onChange={this.handleUrlInputChange}
            />
          </div>
          <div>
            <button
              onClick={() => { this.handleUpdateClick(); }}
            >
              update
            </button>
          </div>
        </div>
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
        type: 'button_group',
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
        type: 'view',
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

  private handleRemoveSubButtonClick(index: number, subIndex: number, e: React.MouseEvent<HTMLElement>) {
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

  private handleMenuButtonClick(index: number, subIndex: number | null, e: React.MouseEvent<HTMLElement>) {
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
