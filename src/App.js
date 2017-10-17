import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import {Image, Navbar, Collapse, Modal, Button, Row, Col, Grid} from 'react-bootstrap';
import _ from 'lodash';
import Header from './Header';
import CircularProgress from './percentageCircle';
import MovieDetails from './MovieDetails';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterMovies: [],
      genres: [],
      openDetails: [],
    };

    this.closeDetails = this.closeDetails.bind(this);
  }

  openDetails(id) {
    this.setState({
        openDetails: {
            [id]: true
        }
    });
  }

  closeDetails() {
    this.setState({openDetails: false});
  }

  handleMovieDetails() {
    this.openDetails();
  }

  componentDidMount() {

    var self = this;
    const { cookies } = self.props;
    var userLang = navigator.language || navigator.userLanguage;

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
    axios.get('https://api.themoviedb.org/3/discover/tv?api_key=92b418e837b833be308bbfb1fb2aca1e&language=' + userLang + '&sort_by=popularity.desc&page=1&timezone=America/New_York&include_null_first_air_dates=false')
     .then(items => {
       //console.log(items.data.results);
       this.setState({filterMovies: items.data.results});
     });
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Grid>
          <Row>
            {this.state.filterMovies.map((movie, i) => {
                  let ratingColor = '';
                  return(
                    <Col key={i} md={3} sm={4} xs={12}>
                      <div style={{transitionDelay: '0.' + i + 's'}} className="thumb center-block">
                          <div className="thumbImageContainer">

                            <div className="thumbImage" style={{background: "url(http://image.tmdb.org/t/p/w185/" + movie.poster_path + ")"}}/>

                            <a href="javascript:void(0)" onClick={this.openDetails.bind(this, i)}>
                              <div className="thumbImageOverlay">
                                <div className="rating">
                                  <CircularProgress
                                    strokeWidth="4"
                                    radius="24"
                                    percentage={movie.vote_average*10}/>
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
                      <Modal bsSize="large" show={this.state.openDetails[i] || false} onHide={this.closeDetails}>
                        <MovieDetails id={movie.id}/>
                      </Modal>
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
