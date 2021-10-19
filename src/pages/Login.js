import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      enterButtonDisabled: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.activateSaveButton = this.activateSaveButton.bind(this);
    this.checkNameSize = this.checkNameSize.bind(this);
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
    const maxLength = 3;
    if (id.length >= maxLength) {
      return true;
    }
  }

  render() {
    const { enterButtonDisabled } = this.state;
    return (
      <div data-testid="page-login" className="page-login">
        <form>
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
