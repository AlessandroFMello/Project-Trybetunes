import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import LoadingPage from './LoadingPage';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checkbox: false,
    };

    this.getFavoriteSong = this.getFavoriteSong.bind(this);
    this.renderMusics = this.renderMusics.bind(this);
  }

  getFavoriteSong = () => {
    const { music } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      await addSong(music);
      this.setState({
        loading: false,
        checkbox: true,
      });
    });
  }

  renderMusics = () => {
    const { trackName, previewUrl, trackId } = this.props;
    const { checkbox } = this.state;
    return (
      <div>
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            className="favorite-music"
            type="checkbox"
            checked={ checkbox }
            onChange={ this.getFavoriteSong }
          />
        </label>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        { this.renderMusics() }
        { loading && <LoadingPage />}
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};
