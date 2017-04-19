import React, { Component } from 'react';
import { connect } from 'react-redux';
import Content from '../components/Content';

class App extends Component {
  render() {
    return (
      <Content {...this.props} />
       );
  }
}

App.propTypes = App;

function mapStateToProps(state) {
  const { router } = state;
  return {
    router,
  };
}

export default connect(mapStateToProps)(App);
