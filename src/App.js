import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
// import Header from './components/Header';
import './App.css';

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.conditionalRenderLogin = this.conditionalRenderLogin.bind(this);
  // }

  // conditionalRenderLogin = () => {
  //   if (window.location.pathname !== '/') return <Header />;
  // }

  render() {
    return (
      <BrowserRouter>
        {/* dica do Denis Johnatan
        { this.conditionalRenderLogin() } */}
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
