import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { navigateTo } from '../actions/navigate';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#FF4331',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  toolbarButton: {
    width: 50,
    color: '#fff',
    textAlign: 'center',
  },
  toolbarTitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  content: {
    backgroundColor: '#ebeef0',
    flex: 1,
  },
});

class Steps extends Component {

  constructor() {
    super();
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  handleButtonPress(name) {
    const { dispatch } = this.props;
    dispatch(navigateTo(name));
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.toolbar}>
          <Text style={styles.toolbarButton}>Home</Text>
          <Text style={styles.toolbarTitle}>Home address</Text>
          <Text style={styles.toolbarButton}>Notify</Text>
        </View>
        <View style={styles.content}>
          <Text>This is the content</Text>
        </View>
      </View>
    );
  }
}

Steps.propTypes = propTypes;

export default Steps;
