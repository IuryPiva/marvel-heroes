import React from "react";

import { Redirect } from "react-router-dom";
import { Card, NameMeta, Drawer, DrawerDescription } from "./style";

export default class CharacterPreview extends React.Component {
  state = { visible: false, redirectTo: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  handleClick = () => {
    this.setState({
      redirectTo: `/character/${this.props.id}`
    });
  };

  render() {
    return this.state.redirectTo ? (
      <Redirect to={this.state.redirectTo} />
    ) : (
      <>
        <Card
          onClick={() => this.handleClick()}
          hoverable
          onMouseEnter={this.showDrawer}
          cover={
            <img
              alt="character"
              src={`${this.props.thumbnail.path}.${this.props.thumbnail.extension}`}
            />
          }
        >
          <NameMeta
          >
            {this.props.name.toUpperCase()}
          </NameMeta>
          {this.props.description && (
            <Drawer
              title="Info"
              placement="right"
              closable={true}
              onMouseLeave={this.onClose}
              onClose={this.onClose}
              visible={this.state.visible}
              getContainer={false}
              destroyOnClose
            >
              <DrawerDescription>{this.props.description}</DrawerDescription>
            </Drawer>
          )}
        </Card>
      </>
    );
  }
}
