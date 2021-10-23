import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      albums: [],
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
        albums: [...response],
        artist: '',
      });
      document.querySelector('#search-form').value = '';
    });
  }

  renderArtist = () => {
    const { lastArtistResult, albums } = this.state;
    return (
      <div className="artist-section">
        {
          (albums.length > 0)
            ? <h3>{ `Resultado de álbuns de: ${lastArtistResult}` }</h3>
            : <h3>Nenhum álbum foi encontrado</h3>
        }
        <div className="albums-section">
          { albums.map((album) => (
            <Link
              to={ `/album/${album.collectionId}` }
              key={ album.collectionId }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              <div className="albums">
                <img
                  src={ album.artworkUrl100 }
                  alt={ `${album.artistName}: ${album.collectionName}` }
                />
                <p>{album.collectionName}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  renderForm = () => {
    const { enterButtonDisabled } = this.state;
    return (
      <div className="search-form">
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
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-search">
        { this.renderForm() }
        { loading ? <LoadingPage /> : this.renderArtist() }

      </div>
    );
  }
}

export default Search;
