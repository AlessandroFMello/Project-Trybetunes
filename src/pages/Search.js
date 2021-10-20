import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      enterButtonDisabled: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.activateSaveButton = this.activateSaveButton.bind(this);
    this.checkNameSize = this.checkNameSize.bind(this);
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

  render() {
    const { enterButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
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
}

export default Search;
