import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';

import App from '../components/App';

const reducer = combineReducers(reducers);
const store = createStore(reducer, applyMiddleware(thunk));

class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
      );
  }
}

AppContainer.propTypes = AppContainer;

export default AppContainer;
