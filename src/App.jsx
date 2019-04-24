import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Posts } from './components/posts';
import { NavBar, TopBar } from './components/layout';
import withAuth from './withAuth';

export const ThemeContext = React.createContext();
class App extends Component {
  state = {
    editing: null,
  };

  render() {
    const { auth } = this.props;
    if (auth.loading) return null;
    const { user, login, logout } = auth;
    return (
      <ThemeContext.Provider value={user}>
        <Container fluid>
          {user ? (
            <div>
              <TopBar user={user} logout={() => logout()} />
              <Posts />
            </div>
          ) : (
              <NavBar login={() => login()} />
            )}
        </Container>
      </ThemeContext.Provider>
    );
  }
}

App.contextType = ThemeContext;

export default withAuth(App);