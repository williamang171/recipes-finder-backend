import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";

import App from './App';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import store from "store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Auth0ProviderWithHistory>
          <App />
        </Auth0ProviderWithHistory>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
