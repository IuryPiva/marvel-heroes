import React from "react";
import "./CardDetails.css";

import { Drawer, Card } from "antd";
import { Redirect } from "react-router-dom";

export default class CardDetails extends React.Component {
  state = { visible: false, redirectTo: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    console.log("state", this.state);

    this.setState({
      visible: false
    });
  };

  handleClick = () => {
    this.setState(
      {
        redirectTo: `/character/${this.props.id}`
      }
    )
  }

  render() {
    return this.state.redirectTo
      ? (<Redirect to={this.state.redirectTo} />)
      :(
      <>
        <Card
          onClick={() => this.handleClick()}
          hoverable
          onMouseEnter={this.showDrawer}
          className="site-drawer-render-in-current-wrapper"
          cover={
            <img
              alt="example"
              src={`${this.props.thumbnail.path}.${this.props.thumbnail.extension}`}
            />
          }
          bodyStyle={{
            background: "#151515",
            borderTopStyle: "solid",
            borderColor: "red",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            {this.props.name.toUpperCase()}
          </span>
          {(this.props.description && <Drawer
            title="Info"
            placement="right"
            closable={true}
            onMouseLeave={this.onClose}
            onClose={this.onClose}
            visible={this.state.visible}
            getContainer={false}
            headerStyle={{ 
              color: "snow",
              background: "#000000bd"
            }}
            style={{ position: "absolute", background: "#17010161" }}
            bodyStyle={{
              background: "transparent"
            }}
            destroyOnClose  
          >
            <p style={{ color: "snow" }}>{this.props.description}</p>
          </Drawer>)}
        </Card>
      </>
    );
  }
}
