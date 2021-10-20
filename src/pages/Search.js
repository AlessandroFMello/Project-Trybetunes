import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingPage from './LoadingPage';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      lastArtistResult: '',
      enterButtonDisabled: true,
      loading: false,
      musics: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.activateSaveButton = this.activateSaveButton.bind(this);
    this.checkNameSize = this.checkNameSize.bind(this);
    this.renderArtist = this.renderArtist.bind(this);
  }

  handleInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      artist: value,
    }, this.activateSaveButton);
  }

  activateSaveButton = () => {
    if (this.checkNameSize()) {
      this.setState({ enterButtonDisabled: false });
    } else {
      this.setState({ enterButtonDisabled: true });
    }
  }

  checkNameSize = () => {
    const { artist } = this.state;
    const MAX_LENGTH = 2;
    if (artist.length >= MAX_LENGTH) {
      return true;
    }
  }

  onEnterButtonSubmit = (event) => {
    event.preventDefault();
    const { artist } = this.state;
    this.setState({
      loading: true,
      lastArtistResult: artist,
    }, async () => {
      const response = await searchAlbumsAPI(artist);
      this.setState({
        loading: false,
        musics: [...response],
        artist: '',
      });
      document.querySelector('#search-form').value = '';
    });
  }

  renderArtist = () => {
    const { lastArtistResult, musics } = this.state;
    return (
      <div className="artist-section">
        {
          (musics.length > 0)
            ? <h3>{ `Resultado de álbuns de: ${lastArtistResult}` }</h3>
            : <h3>Nenhum álbum foi encontrado</h3>
        }
        <div className="musics-section">
          { musics.map((music) => (
            <Link
              to={ `/album/${music.collectionId}` }
              key={ music.collectionId }
              data-testid={ `link-to-album-${music.collectionId}` }
            >
              <div className="music">
                <img
                  src={ music.artworkUrl100 }
                  alt={ `${music.artistName}: ${music.collectionName}` }
                />
                <p>{music.collectionName}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { enterButtonDisabled, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form onSubmit={ this.onEnterButtonSubmit }>
          <label htmlFor="search-form">
            <input
              type="text"
              name="search-form"
              id="search-form"
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              onChange={ this.handleInputChange }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ enterButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
        { loading ? <LoadingPage /> : this.renderArtist() }

      </div>
    );
  }
}

export default Search;
