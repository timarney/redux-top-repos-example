import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import data from './api/data.json';
import App from './components/App';

require('./css/app.scss');

const initialState = { items: { num: 0, data },
                       repo: { json: {}, isLoading: false},
                     };

const store = configureStore(initialState);

function doRender() {
  render(
      <Provider store={store}>
        <App />
      </Provider>, document.querySelector('#app')
  );
}

doRender();
store.subscribe(doRender);
