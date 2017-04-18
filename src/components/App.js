import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  inputsContainer: {
    flex: 1,
  },
  firstWidthButton: {
    marginTop: 150,
  },
  consecutiveButton: {
    marginTop: 5,
  },
  fullWidthButton: {
    backgroundColor: '#C56C39',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidthButtonText: {
    fontSize: 20,
    color: 'white',
  },
  input: {
    paddingLeft: 15,
    height: 40,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'stretch',
  },
});

class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <TouchableHighlight style={[styles.fullWidthButton, styles.firstWidthButton]} >
            <Text style={styles.fullWidthButtonText}>Hello</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default App;
