import React, { Component } from 'react';
import LoadingPage from '../pages/LoadingPage';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      loading: false,
    };

    this.findUser = this.findUser.bind(this);
  }

  componentDidMount() {
    this.findUser();
  }

  findUser = () => {
    this.setState({
      loading: true,
    }, async () => {
      const id = await getUser();
      this.setState({
        id,
        loading: false,
      });
    });
  }

  render() {
    const { id, loading } = this.state;
    return (
      <div data-testid="header-component">
        {loading && <LoadingPage />}
        <h1 data-testid="header-user-name">
          { id.name }
        </h1>
      </div>
    );
  }
}

export default Header;
