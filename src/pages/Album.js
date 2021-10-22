import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import LoadingPage from './LoadingPage';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      album: '',
      loading: false,
      myFavorites: [],
    };

    this.getAlbumMusics = this.getAlbumMusics.bind(this);
    this.renderAlbumMusics = this.renderAlbumMusics.bind(this);
    this.retrieveFavoriteSongs = this.retrieveFavoriteSongs.bind(this);
    this.checkFavorites = this.checkFavorites.bind(this);
  }

  componentDidMount() {
    this.getAlbumMusics();
    this.retrieveFavoriteSongs();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { myFavorites } = this.state;
    if (prevState.myFavorites !== myFavorites) {
      this.checkFavorites();
    }
  }

  getAlbumMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const music = await getMusics(id);
    this.setState({
      album: music,
    });
  }

  retrieveFavoriteSongs = () => {
    this.setState({
      loading: true,
    }, async () => {
      const favoriteMusics = await getFavoriteSongs();
      this.setState({
        loading: false,
        myFavorites: [...favoriteMusics],
      });
    });
  }

  checkFavorites = () => {
    const { myFavorites } = this.state;
    myFavorites.forEach((favorite) => {
      const favoriteMusic = document.getElementById(favorite.trackId);
      if (favoriteMusic) favoriteMusic.checked = true;
    });
  }

  renderAlbumMusics = () => {
    const { album, loading } = this.state;
    return (
      <div className="album">
        <div className="album-header">
          <h2 data-testid="artist-name">
            { album[0].artistName }
          </h2>
          <h3 data-testid="album-name">
            { album[0].collectionName }
          </h3>
          <div>
            {album.slice(1)
              .map((music, index) => (
                <MusicCard
                  key={ index }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  music={ music }
                  checkFavorites={ this.checkFavorites }
                />
              ))}
            { loading && <LoadingPage /> }
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { album.length > 0 && this.renderAlbumMusics() }
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
