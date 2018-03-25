import React from 'react';
import { connect } from 'react-redux';
import './MenuDesigner.scss';

interface IProps {
  user: {};
}

interface IState {
  currentEditingButton: string | null;
  buttons: Array<IButton>;
}

interface IButton {
  id: number;
  name: string;
  type: string;
  value: string;
  subButtons: Array<IButton>;
}

class MenuDesigner extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentEditingButton: null,
      buttons: []
    };
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    // tslint:disable-next-line:no-console
    console.log(prevState);
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.buttons.map((button, index) => {
            return (
              <li key={index}>
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
                      <li key={subIndex}>
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
    );
  }

  private handleAddButtonClick() {
    let buttons = this.state.buttons.slice();
    if (buttons.length < 3) {
      const nextButtonId = this.getNextButtonId(buttons);
      const newButton = {
        id: nextButtonId,
        name: 'new button ' + nextButtonId,
        type: 'button_group',
        value: '',
        subButtons: []
      };
      buttons.push(newButton);
      this.setState({
        buttons: buttons
      });
    }
  }

  private handleAddSubButtonClick(index: number) {
    const buttons = this.state.buttons.slice();
    let subButtons = buttons[index].subButtons as Array<IButton>;
    if (subButtons.length < 5) {
      const nextButtonId = this.getNextButtonId(subButtons);
      subButtons.push({
        id: nextButtonId,
        name: 'new sub-button ' + nextButtonId,
        type: 'view',
        value: '',
        subButtons: []
      });
      buttons[index].subButtons = subButtons;
      this.setState({
        buttons: buttons
      });
    }
  }

  private handleRemoveButtonClick(index: number) {
    const buttons = this.state.buttons.slice();
    if (buttons.length > 0) {
      buttons.splice(index, 1);
      this.setState({
        buttons: buttons
      });
    }
  }

  private handleRemoveSubButtonClick(index: number, subIndex: number) {
    const buttons = this.state.buttons.slice();
    const subButtons = buttons[index].subButtons;
    if (subButtons.length > 0) {
      subButtons.splice(subIndex, 1);
      buttons[index].subButtons = subButtons;
      this.setState({
        buttons: buttons
      });
    }
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
