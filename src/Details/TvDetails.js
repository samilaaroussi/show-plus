import React, { Component } from 'react';
import axios from 'axios';
import {
  Media,
  Image,
  Navbar,
  Collapse,
  Modal,
  Button,
  Row,
  Col,
  Grid
} from 'react-bootstrap';
import _ from 'lodash';
import CircularProgress from '../percentageCircle';
import ContentLoader, { Rect, Circle } from 'react-content-loader';
import '../App.css';
import './index.css';
var moment = require('moment');
moment().format();

class TvDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tvDetails: [],
      tvCreators: [],
      tvCredits: [],
      tvPreview: [],
      genre: [],
      country: [],
      runtime: [],
      loading: true
    };
  }

  handleMovieDetails() {
    this.openDetails();
  }

  componentDidMount() {
    var self = this;
    const { cookies } = self.props;
    var userLang = navigator.language || navigator.userLanguage;

    //load TV show details, credits and videos ref from TheMovieDB API
    axios
      .all([
        axios.get(
          'https://api.themoviedb.org/3/tv/' +
            this.props.id +
            '?api_key=92b418e837b833be308bbfb1fb2aca1e&language=' +
            userLang
        ),
        axios.get(
          'https://api.themoviedb.org/3/tv/' +
            this.props.id +
            '/credits?api_key=92b418e837b833be308bbfb1fb2aca1e&language=' +
            userLang
        ),
        axios.get(
          'https://api.themoviedb.org/3/tv/' +
            this.props.id +
            '/videos?api_key=92b418e837b833be308bbfb1fb2aca1e&language=' +
            userLang
        )
      ])
      .then(
        axios.spread((tvDetails, tvCredits, tvPreviews) => {
          this.setState({
            tvDetails: tvDetails.data,
            tvCreators: tvDetails.data.created_by,
            genre: tvDetails.data.genres[0],
            runtime: tvDetails.data.episode_run_time[0],
            country: tvDetails.data.origin_country[0],
            tvCredits: tvCredits.data.cast,
            tvPreview: tvPreviews.data.results[0],
            loading: false
          });
        })
      );
  }

  render() {
    var bg = '';

    if (
      this.state.tvDetails.backdrop_path === undefined ||
      this.state.tvDetails.backdrop_path === null
    ) {
      bg = '#333';
    } else {
      bg =
        'url(https://image.tmdb.org/t/p/w500/' +
        this.state.tvDetails.backdrop_path +
        ')';
    }

    return (
      <div className="movieDetailsContainer">
        <div className="movieDetails" style={{ background: bg }} />
        <div className="movieDetailsOverlay">
          <Modal.Header closeButton={true} />
          <Modal.Body>
            {this.state.loading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <Row>
                  <Col md={12}>
                    <div className="movieTitle">
                      <span className="movieName">
                        {this.state.tvDetails.name}
                      </span>
                      <span className="movieDate">
                        {this.state.tvDetails.last_air_date
                          ? moment(this.state.tvDetails.last_air_date, [
                              'YYYY-MM-DD'
                            ]).year()
                          : ''}
                      </span>
                    </div>
                    <div className="movieSubtitle">
                      {this.state.country + '  ·  '}
                      {this.state.genre.name + '  ·  '}
                      <i className="fa fa-clock-o" />
                      {' ' + this.state.runtime + ' min'}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <p className="movieOverview">
                      {this.state.tvDetails.overview}
                    </p>
                  </Col>
                  <Col md={4} sm={12} xs={12}>
                    <div className="movieList">
                      {this.state.tvCreators.length !== 0 ? (
                        <div>
                          <div>CREATORS</div>
                          <ul>
                            {this.state.tvCreators.map((creator, i) => {
                              return <li key={i}>{creator.name}</li>;
                            })}
                          </ul>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} xsHidden={true} className="movieCast">
                    {this.state.tvCredits.slice(0, 3).map((cast, i) => {
                      var avatar = '';

                      if (cast.profile_path === null) {
                        avatar = '/img/default-avatar.jpg';
                      } else {
                        avatar =
                          'https://image.tmdb.org/t/p/w500/' +
                          cast.profile_path;
                      }

                      return (
                        <Col md={2} sm={4} key={i}>
                          <div className="flex-item">
                            <Media>
                              <Media.Left align="middle">
                                <div
                                  style={{
                                    background: 'url(' + avatar + ') center',
                                    backgroundSize: 'cover',
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '25px'
                                  }}
                                />
                              </Media.Left>
                              <Media.Body>{cast.name}</Media.Body>
                            </Media>
                          </div>
                        </Col>
                      );
                    })}
                  </Col>
                </Row>
                <Row className="topBuffer">
                  <Col md={12} smHidden={true} xsHidden={true}>
                    <div className="movieLinks">
                      {this.state.tvPreview ? (
                        <Button
                          href={
                            'https://www.youtube.com/watch?v=' +
                            this.state.tvPreview.key
                          }
                          target="_blank"
                        >
                          <i className="fa fa-play-circle-o" /> Watch Preview
                        </Button>
                      ) : (
                        ''
                      )}
                      <Button
                        href={this.state.tvDetails.homepage}
                        target="_blank"
                      >
                        {' '}
                        More Infos <i className="fa fa-arrow-right" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </Modal.Body>
        </div>
      </div>
    );
  }
}

export default TvDetails;
