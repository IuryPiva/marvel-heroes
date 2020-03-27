import React from "react";
import "./App.css";
import MainPage from "./pages/MainPage";
import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CharacterPage from "./pages/CharacterPage";
import styled from "styled-components";
import Logo from "./components/Logo";

const { Header: _Header, Content: _Content, Footer: _Footer } = Layout;

const Footer = styled(_Footer)`
  text-align: center;
`;

const Content = styled(_Content)`
  padding: 50px;
  min-height: 80vh;
  display: grid;
  align-items: center;
`;

const Header = styled(_Header)`
  display: grid;
  align-items: center;
`;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <Logo />
        </Header>
        <Content>
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route path="/character/:characterId">
              <CharacterPage />
            </Route>
          </Switch>
        </Content>
        <Footer>Data provided by Marvel. © 2020 Marvel</Footer>
      </Layout>
    </Router>
  );
}

export default App;
