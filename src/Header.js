import React, { Component } from 'react';
import { Image, Navbar } from 'react-bootstrap';
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
            <Image src="/img/logo.png" className="App-logo" alt="logo" />
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default Header;
