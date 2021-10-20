import React, { Component } from 'react';
import LoadingPage from '../pages/LoadingPage';
import { getUser } from '../services/userAPI';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      loading: false,
    };

    this.findUser = this.findUser.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
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

  renderHeader = () => {
    const { id } = this.state;
    return (<h1 data-testid="header-user-name">{ id.name }</h1>);
  }

  render() {
    const { loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading
            ? <LoadingPage />
            : this.renderHeader()
        }
      </header>
    );
  }
}

export default Header;
