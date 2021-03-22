import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Nightmode } from './styles/Themes';
import { GlobalStyle } from './styles/GlobalStyle';

import Authentication from './utils/Authentication';
import Authoritaw from './pages/Authoritaw';
import Home from './pages/Home';

import API from './api';
import { setAuthToken, resetAuthToken } from './utils/token';

export interface IUser {
    _id?: string;
    email?: string;
    password?: string;
}

export interface IAuthProps {
  login?: () => void;
  logout?: () => void;
  register: () => void;
}

export let UserContext: React.Context<IUser | null>;

const App = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  UserContext = React.createContext(user);

  useEffect(() => {
    (async function() {
      const token = localStorage.getItem('token');
      try {
        if (token) {
          setAuthToken(token);
          const response = await API.user.me();
          setUser(response.data.user);
          setAuthToken(response.data.token);
        }
      } catch (err) {
        if (token) resetAuthToken();
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    })();
  }, []);

  async function login(data: IUser): Promise<void> {
    const response = await API.user.login(data);
    setUser(response.data.user);
    setAuthToken(response.data.token);
  }

  async function register(data: IUser): Promise<void> {
    const response = await API.user.register(data);
    setUser(response.data.user);
    setAuthToken(response.data.token);
  }

  function logout(): void {
    resetAuthToken();
    setUser(null);
  }

  const authProps = {
    logout,
    login,
    register
  }

  if (loading) {
    return (
      <div>
        Narf!
      </div>
    )
  }

  return (
    <ThemeProvider theme={Nightmode}>
      <GlobalStyle />

      <Router>
        <Switch>
          <Route exact path="/">
            {routeProps => (
              <Home {...routeProps} {...authProps} />
            )}
          </Route>

          <Route
            exact
            path="/login"
            component={Authentication(Authoritaw, {
              authenticated: user,
              required: false,
              login,
              register
            })}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
