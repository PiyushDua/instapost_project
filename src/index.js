import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';
import { ApolloProvider } from 'react-apollo';
import { NoMatch } from './components/NoMatch';
import App from './App';
import { SnackBarProvider } from '../src/contexts';
import registerServiceWorker from './registerServiceWorker';
import client from './apollo';

ReactDOM.render(
  <SnackBarProvider>
    <BrowserRouter>
      <Security
        issuer='https://dev-968110.okta.com/oauth2/default'
        redirect_uri={`${window.location.origin}/implicit/callback`}
        client_id='0oaf8vl6btMh6U5fu356'
      >
        <ApolloProvider client={client}>
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/implicit/callback" component={ImplicitCallback} />
            <Route component={NoMatch} />
          </Switch>
        </ApolloProvider>
      </Security>
    </BrowserRouter>
  </SnackBarProvider>,
  document.getElementById('root')
);
registerServiceWorker();
if (module.hot) module.hot.accept();
