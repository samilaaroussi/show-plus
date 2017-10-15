import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import {Image, Navbar, Collapse, Modal, Button, Row, Col, Grid} from 'react-bootstrap';
import _ from 'lodash';
import CircularProgress from './percentageCircle';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      filterMovies: [],
      genres: []
    };
  }

  componentDidMount() {

    var self = this;
    const { cookies } = self.props;

     axios.all([
       axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US'),
       axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US')
    ])
    .then(axios.spread((tvGenres, movieGenres) => {
        var tvGenres = tvGenres.data.genres;
        var movieGenres = movieGenres.data.genres;
        this.setState({genres: tvGenres.concat(movieGenres)})
    }));

    //filter events
    axios.get('https://api.themoviedb.org/3/discover/tv?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US&sort_by=popularity.desc&page=1&timezone=America/New_York&include_null_first_air_dates=false')
     .then(items => {
       //console.log(items.data.results);
       this.setState({filterMovies: items.data.results});
     });
  }

  render() {
    return (
      <div className="App">
        <Navbar className="navbar-default navbar-fixed-top">
          <Navbar.Header>
            <Navbar.Brand>
              <Image src="/img/logo.png" className="App-logo" alt="logo"/>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            {this.state.filterMovies.map((movie, i) => {
                  let ratingColor = '';
                  return(
                    <Col key={i} md={3} xs={6}>
                      <div style={{transitionDelay: '0.' + i + 's'}} className="thumb">
                          <div className="thumbImageContainer">

                            <div className="thumbImage" style={{background: "url(http://image.tmdb.org/t/p/w185/" + movie.poster_path + ")"}}/>

                            <a href="#">
                              <div className="thumbImageOverlay">
                                <div className="rating">
                                  <CircularProgress
                                    strokeWidth="4"
                                    radius="24"
                                    percentage={movie.vote_average}/>
                                </div>
                              </div>
                            </a>
                          </div>
                        <div className="thumbTitle">{movie.name}</div>
                        <div className="thumbSubtitle">
                          <ul>
                            {movie.genre_ids.slice(0, 2).map((genreId, j) => {
                              let genre = _.find(this.state.genres, { 'id': genreId });
                              if(genre) {
                                return(<li style={{transitionDelay: '0.' + j + 's'}} key={j}>{genre.name}</li>)
                              }
                            }
                            )}
                          </ul>
                        </div>
                      </div>
                    </Col>
                  );
            })}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
