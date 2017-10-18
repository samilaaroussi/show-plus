import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import {Image, Navbar, Collapse, Modal, Button, Row, Col, Grid} from 'react-bootstrap';
import _ from 'lodash';
import Header from './Header';
import CircularProgress from './percentageCircle';
import MovieDetails from './MovieDetails';
import TvDetails from './TvDetails';
import InfiniteScroll from 'react-infinite-scroller';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
