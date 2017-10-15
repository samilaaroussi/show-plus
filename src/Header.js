import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import {Image, Navbar, Collapse, Modal, Button, Row, Col, Grid} from 'react-bootstrap';
import _ from 'lodash';
import './App.css';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Navbar className="navbar-default navbar-fixed-top">
        <Navbar.Header>
          <Navbar.Brand>
            <Image src="/img/logo.png" className="App-logo" alt="logo"/>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default Header;
