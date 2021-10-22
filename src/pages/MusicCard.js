import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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
    this.retrieveFavorites = this.retrieveFavorites.bind(this);
  }

  componentDidMount() {
    this.retrieveFavorites();
  }

  retrieveFavorites = () => {
    const { music: { trackId } } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      const favoriteMusics = await getFavoriteSongs();
      const favoriteMusicsArray = favoriteMusics
        .map((favoriteMusic) => favoriteMusic.trackId);
      if (favoriteMusicsArray.includes(trackId)) {
        return this.setState({
          checkbox: true,
          loading: false,
        });
      }
      return this.setState({
        checkbox: false,
        loading: false,
      });
    });
  }

  getFavoriteSong = () => {
    const { music } = this.props;
    const { checkbox } = this.state;
    if (!checkbox) {
      this.setState({
        loading: true,
      }, async () => {
        await addSong(music);
        this.setState({
          loading: false,
          checkbox: true,
        });
      });
    } else {
      this.setState({
        loading: true,
      }, async () => {
        await removeSong(music);
        this.setState({
          loading: false,
          checkbox: false,
        });
      });
    }
  }

  renderMusics = () => {
    const { trackName, previewUrl, trackId } = this.props;
    const { checkbox } = this.state;
    return (
      <div className="album-music">
        <h3>{trackName}</h3>
        <div className="album-music-body">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <div className="label-wrapper">
            <label htmlFor={ trackId }>
              <input
                data-testid={ `checkbox-music-${trackId}` }
                id={ trackId }
                className="favorite-music"
                type="checkbox"
                checked={ checkbox }
                onChange={ this.getFavoriteSong }
              />
            </label>
            <div className="div-to-hide">Favorita</div>
          </div>
        </div>
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
