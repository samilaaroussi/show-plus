import React, { Component } from 'react';
import axios from 'axios';
import {Media, Image, Navbar, Collapse, Modal, Button, Row, Col, Grid} from 'react-bootstrap';
import _ from 'lodash';
import CircularProgress from '../percentageCircle';
import '../App.css';
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
      runtime: []
    };
  }

  handleMovieDetails() {
    this.openDetails();
  }

  componentDidMount() {

    var self = this;
    const { cookies } = self.props;
    var userLang = navigator.language || navigator.userLanguage;

     axios.all([
       axios.get('https://api.themoviedb.org/3/tv/' + this.props.id + '?api_key=92b418e837b833be308bbfb1fb2aca1e&language=' + userLang),
       axios.get('https://api.themoviedb.org/3/tv/' + this.props.id + '/credits?api_key=92b418e837b833be308bbfb1fb2aca1e&language=' + userLang),
       axios.get('https://api.themoviedb.org/3/tv/' + this.props.id + '/videos?api_key=92b418e837b833be308bbfb1fb2aca1e&language=' + userLang)
    ])
    .then(axios.spread((tvDetails, tvCredits, tvPreviews) => {
      this.setState({tvDetails: tvDetails.data});
      console.log(tvDetails.data);
      this.setState({tvCreators: tvDetails.data.created_by});
      this.setState({genre: tvDetails.data.genres[0]});
      this.setState({runtime: tvDetails.data.episode_run_time[0]});
      this.setState({country: tvDetails.data.origin_country[0]});
      this.setState({tvCredits: tvCredits.data.cast});
      this.setState({tvPreview: tvPreviews.data.results[0]});
      console.log(tvDetails.data.created_by);
      console.log(tvCredits.data.cast);
    }));
  }

  render() {
    return (
      <div className="movieDetailsContainer">
        <div className="movieDetails" style={{background: "url(https://image.tmdb.org/t/p/w500/" + this.state.tvDetails.backdrop_path + ")"}}>
        </div>
        <div className="movieDetailsOverlay">
        <Modal.Header closeButton={true}>
        </Modal.Header>
        <Modal.Body>
          <Col md={12}>
            <div className="movieTitle">
              <span className="movieName">
                {this.state.tvDetails.name}
              </span>
              <span className="movieDate">
                {this.state.tvDetails.last_air_date ? moment(this.state.tvDetails.last_air_date, ["YYYY-MM-DD"]).year() : ''}
              </span>
            </div>
            <div className="movieSubtitle">
              {this.state.country + '  ·  '}
              {this.state.genre.name + '  ·  '}
              <i className="fa fa-clock-o"></i>
              {' ' + this.state.runtime + ' min · ' }
              {this.state.tvDetails.number_of_seasons + ' Seasons'}
            </div>
          </Col>
          <Col md={8}>
            <p className="movieOverview">{this.state.tvDetails.overview}</p>
          </Col>
          <Col md={4} sm={12} xs={12}>
            <div className="movieList">
              {this.state.tvCreators !== null ?
                <div>
                  <div>CREATORS</div>
                  <ul>{this.state.tvCreators.map((creator, i) => {return(<li key={i}>{creator.name}</li>)})}</ul>
                </div> : ''
              }
            </div>
          </Col>
          <Col md={12} xsHidden={true} className="movieCast">
            {this.state.tvCredits.slice(0,3).map((cast, i) => {
              return(
                <Col md={2} sm={2} key={i}>
                  <div className="flex-item">
                    <Media>
                      <Media.Left align="middle">
                        <div style={{background: "url(https://image.tmdb.org/t/p/w500/" + cast.profile_path + "), url(/img/default-avatar.jpg) center" , backgroundSize: 'cover', width: '50px', height: '50px', borderRadius: '25px'}}></div>
                      </Media.Left>
                      <Media.Body>
                        {cast.name}
                      </Media.Body>
                    </Media>
                  </div>
                </Col>
              )
            })}
            </Col>
            <Col className='top-buffer' md={12}>
              <div className="movieLinks">
                {this.state.tvPreview ? <Button href={'https://www.youtube.com/watch?v=' + this.state.tvPreview.key} target="_blank"><i className="fa fa-play-circle-o"></i> Watch Preview</Button> : ''}
                <Button href={this.state.tvDetails.homepage} target="_blank"> More Infos <i className="fa fa-arrow-right"></i></Button>
              </div>
            </Col>
        </Modal.Body>
        </div>
      </div>
    );
  }
}

export default TvDetails;
