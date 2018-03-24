import React from 'react';
import { connect } from 'react-redux';
import './MenuDesigner.scss';

interface IProps {
  user: {};
}

interface IState {
  currentEditingMenu: string | null;
  menus: Array<IMenu>;
}

interface IMenu {
  name: string;
  type: string;
  value: string | Array<IMenu>;
}

class MenuDesigner extends React.Component<IProps, IState> {

  constructor (props: IProps) {
    super(props);
    this.state = {
      currentEditingMenu: null,
      menus: []
    };

    this.handleAddMenuBtnClick = this.handleAddMenuBtnClick.bind(this);
    this.handleAddSubMenuBtnClick = this.handleAddSubMenuBtnClick.bind(this);
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.menus.map((menu, index) => {
            return (
              <li key={index}>
                {menu.name}
                <button
                  // tslint:disable-next-line:no-any
                  onClick={(e: any) => { this.handleAddSubMenuBtnClick(e, index); }}
                >
                  +
                </button>
                <ul>
                  {(this.state.menus[index].value as Array<IMenu>).map((subMenu, subIndex) => {
                    return (
                      <li key={subIndex}>
                        {subMenu.name}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
        <div>
          <button onClick={this.handleAddMenuBtnClick}>+</button>
        </div>
      </div>
    );
  }

  private handleAddMenuBtnClick () {
    let menus = this.state.menus.slice();
    if (menus.length < 3) {
      const newMenu = {
        name: 'new menu',
        type: 'menu_group',
        value: []
      };
      menus.push(newMenu);
      this.setState({
        menus: menus
      });
    }
  }

  private handleAddSubMenuBtnClick (e: MouseEvent, index: number) {
    const menus = this.state.menus.slice();
    let subMenus = menus[index].value as Array<IMenu>;
    if (subMenus.length < 5) {
      subMenus.push({
        name: 'new sub-menu',
        type: 'view',
        value: ''
      });
      menus[index].value = subMenus;
      this.setState({
        menus: menus
      });
    }
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
