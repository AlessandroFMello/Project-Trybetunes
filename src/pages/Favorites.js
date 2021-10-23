import React, { Component } from 'react';
import LoadingPage from './LoadingPage';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      myFavorites: [],
    };

    this.retrieveFavoriteSongs = this.retrieveFavoriteSongs.bind(this);
    this.checkFavorites = this.checkFavorites.bind(this);
    this.renderFavorites = this.renderFavorites.bind(this);
  }

  componentDidMount() {
    this.retrieveFavoriteSongs();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { myFavorites } = this.state;
    if (prevState.myFavorites !== myFavorites) {
      this.checkFavorites();
    }
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

  renderFavorites = () => {
    const { myFavorites } = this.state;
    console.log(myFavorites);
    return (
      <div className="favorite-musics">
        <h1>Favorite Musics</h1>
        {
          myFavorites.map((music, index) => (
            <div key={ index } className="favorite-music">
              <img src={ music.artworkUrl100 } alt={ music.artistName } />
              <MusicCard
                key={ index }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                music={ music }
              />
            </div>
          ))
        }
      </div>
    );
  }

  render() {
    const { myFavorites, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        {loading
          ? <LoadingPage />
          : (myFavorites.length > 0 && this.renderFavorites()) }
      </div>
    );
  }
}

export default Favorites;
