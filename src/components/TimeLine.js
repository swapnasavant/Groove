import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
} from 'react-native';

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
    color: '#000',
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

class TimeLine extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row3']),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <Text style={styles.headerTitle}>{rowData}</Text>
        }
      />
  );
  }
}

TimeLine.propTypes = propTypes;

export default TimeLine;
