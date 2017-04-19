import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  View,
} from 'react-native';


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

class App extends Component {

  constructor() {
    super();
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  handleButtonPress(name) {
    alert(name);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <Image
            style={styles.img}
            source={require('../images/home.png')}
          />
          <TextInput
            style={[styles.fullWidthButton, styles.input, styles.consecutiveButton]}
            placeholder="Phone Number"
            autoCapitalize="none"
          />
          <TextInput
            style={[styles.input, styles.consecutiveButton]}
            placeholder="Password"
            autoCapitalize="none"
          />
        </View>
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

export default App;
