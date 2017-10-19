import React, { Component } from 'react';
import axios from 'axios';
import Affix from 'react-overlays/lib/Affix';
import {
  Image,
  Navbar,
  Collapse,
  Modal,
  Button,
  Row,
  Col,
  Grid
} from 'react-bootstrap';
import './App.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navbar className="navbar-default">
        <Navbar.Header>
          <Navbar.Brand>
            <Image src="/img/logo2.png" className="App-logo" alt="logo" />
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default Header;
