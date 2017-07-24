import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

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
  toolbarHeader: {
    backgroundColor: '#FF4331',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row',
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
  },
  toolbarAuto: {
    backgroundColor: '#FF4331',
    flexDirection: 'row',
    paddingLeft: 50,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
  },
  inputButtonHome: {
    paddingLeft: 10,
    color: '#fff',
    textAlign: 'center',
  },
  inputYear: {
    marginTop: -25,
    color: '#fff',
    textAlign: 'center',
  },
  dateButton: {
    paddingTop: 15,
    marginLeft: 10,
    color: '#fff',
  },
  dayButton: {
    fontSize: 30,
  },
  inputButtonNotify: {
    paddingRight: 10,
    color: '#fff',
    textAlign: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
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
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
      <View style={styles.mainContainer}>
        <View style={styles.toolbarHeader}>
          <TouchableOpacity
            onPress={() => this.handleButtonPress('hard')}
          >
            <Text style={styles.inputButtonHome} >
              <Icon name="md-home" size={15} />
            </Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            181 Whisman Dr.,
            San Francisco, CA.
          </Text>
          <Text style={styles.inputButtonNotify} >
            <Icon name="ios-notifications" size={15} />
          </Text>
        </View>
        <View style={styles.toolbar}>
            <Text style={[styles.inputButtonHome, styles.dayButton]} >
               {new Date().getDate()}
            </Text>
            <Text style={styles.inputButtonHome} >
               {days[new Date().getDay()]}
            </Text>
            <Text style={styles.headerTitle}>
              Hi Jack,
              You have a task.
            </Text>
        </View>
        <View style={styles.toolbarAuto}>
          <Text style={styles.inputYear} >
              {monthNames[new Date().getMonth()]} {new Date().getFullYear()}
          </Text>
        </View>
      </View>
    );
  }
}

Steps.propTypes = propTypes;

export default Steps;
