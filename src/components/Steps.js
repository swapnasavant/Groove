import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { navigateTo } from '../actions/navigate';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  inputsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 150,
  },
  buttonContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  firstWidthButton: {
    marginTop: 150,
  },
  consecutiveButton: {
    marginTop: 5,
  },
  fullWidthButton: {
    backgroundColor: '#C56C39',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidthButtonText: {
    fontSize: 15,
    color: 'white',
  },
  input: {
    paddingLeft: 15,
    height: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  img: {
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'stretch',
    padding: 20,
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
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={() => this.handleButtonPress('hard')}
            style={[styles.consecutiveButton, styles.fullWidthButton]}
          >
            <Text style={styles.fullWidthButtonText}>Login</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

Steps.propTypes = propTypes;

export default Steps;
