import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoadingPage from './LoadingPage';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      enterButtonDisabled: true,
      loading: false,
      redirect: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.activateSaveButton = this.activateSaveButton.bind(this);
    this.checkNameSize = this.checkNameSize.bind(this);
    this.onEnterButtonSubmit = this.onEnterButtonSubmit.bind(this);
  }

  handleInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      id: value,
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
    const { id } = this.state;
    const MAX_LENGTH = 3;
    if (id.length >= MAX_LENGTH) {
      return true;
    }
  }

  onEnterButtonSubmit = (event) => {
    event.preventDefault();
    const { id } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: id });
      this.setState({
        loading: false,
        redirect: true,
      });
    });
  }

  render() {
    const { enterButtonDisabled, loading, redirect } = this.state;

    return (
      <div data-testid="page-login" className="page-login">
        {loading ? <LoadingPage /> : (redirect && <Redirect to="/search" />)}
        <form onSubmit={ this.onEnterButtonSubmit }>
          <label htmlFor="login-name">
            Login
            <input
              data-testid="login-name-input"
              type="text"
              id="login-name"
              onChange={ this.handleInputChange }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ enterButtonDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
