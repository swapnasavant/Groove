import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  timelineHeader: {
    position: 'absolute',
    top: 0,
    left: 100,
    bottom: 0,
    flexDirection: 'row',
    width: 1,
    backgroundColor: '#979797',
    zIndex: 0,
  },
  toolbarHeader: {
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row',
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
  },
  inputButtonHome: {
    paddingLeft: 10,
    fontSize: 10,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    flex: 1,
  },
  inputButtonNotify: {
    top: 13,
    left: 85,
    lineHeight: 34,
    zIndex: 2,
    position: 'absolute',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#ebeef0',
  },
  img: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'red',
    zIndex: 2,
  },
  headerTitle: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  timelineContainer: {
    flex: 1,
  },
  downArrow: {
    paddingRight: 10,
    color: '#444',
    textAlign: 'center',
  },
});

class TimeLine extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([
        {
          time: 'Today',
          person: 'realtor',
          task: 'Open Escrow Account',
        },
        {
          time: 'Tomorrow',
          person: 'buyer',
          task: 'Deposit 3% to escrow',
        },
        {
          time: '08/08/2017',
          person: 'realtor',
          task: 'Title search and insurance',
        },
        {
          time: '08/18/2017',
          person: 'realtor',
          task: 'Shop for mortgage',
        },
        {
          time: '08/20/2017',
          person: 'realtor',
          task: 'Finalise a lender',
        },
        {
          time: '08/26/2017',
          person: 'realtor',
          task: 'Fill in application',
        },
        {
          time: '08/26/2017',
          person: 'realtor',
          task: 'Fill in application',
        },
        {
          time: '08/26/2017',
          person: 'realtor',
          task: 'under writter task',
        },
        {
          time: '08/29/2017',
          person: 'realtor',
          task: 'Get the necessary data',
        },
      ]),
    };
  }

  render() {
    return (
      <View style={styles.timelineContainer}>
        <View style={styles.timelineHeader} />
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <View style={styles.toolbarHeader}>
                <TouchableOpacity
                  onPress={() => this.handleButtonPress('hard')}
                >
                  <Text style={styles.inputButtonHome} >
                    {rowData.time}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.inputButtonNotify} >
                  <Image
                    style={styles.img}
                    source={require(`../images/realtor.png`)}
                  />
                </Text>
                <Text style={styles.headerTitle}>
                  {rowData.task}
                </Text>
                <Text style={styles.downArrow} >
                  <Icon name="ios-arrow-down-outline" size={15} />
                </Text>
              </View>
            }
          />
        </View>
      </View>
  );
  }
}

TimeLine.propTypes = propTypes;

export default TimeLine;
