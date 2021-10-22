import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      <header data-testid="header-component" className="header">
        <div className="user-div">
          {
            loading
              ? <LoadingPage />
              : this.renderHeader()
          }
        </div>
        <nav className="links-nav">
          <div className="nav-item">
            <Link
              data-testid="link-to-search"
              className="search"
              to="/search"
            >
              Pesquisar
            </Link>
          </div>
          <div className="nav-item">
            <Link
              data-testid="link-to-favorites"
              className="favorites"
              to="/favorites"
            >
              Favoritos
            </Link>
          </div>
          <div className="nav-item">
            <Link
              data-testid="link-to-profile"
              className="profile"
              to="/profile"
            >
              Perfil
            </Link>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
