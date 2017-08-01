import {
  StyleSheet,
  Dimensions,
  ListView,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component, PropTypes } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import Popover from './Popover';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
  popoverContent: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
    minWidth: SCREEN_WIDTH,
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row',
    textAlign: 'center',
    flex: 1,
  },
  toolbarHeader: {
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row',
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
    backgroundColor: '#FFFFFF',
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
    this.state = {
      dataSource: this.getDSValues(),
      isVisible: false,
      eleVisible: null,
      buttonRect: {},
    };
  }

  getDSValues() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return ds.cloneWithRows([
      {
        time: 'Today',
        person: 'realtor',
        task: 'Open Escrow Account',
        content: 'Please open an escrow account.',
      },
      {
        time: 'Tomorrow',
        person: 'buyer',
        task: 'Deposit 3% to escrow',
        content: 'Withdraw cashier’s check for amount $45,000. Payable to “Orange Coast Title Company”. Notes should contain escrow number 12345. Hand over cashier’s check to realtor or escrow company.',
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
    ]);
  }

  showPopover(ele) {
    this[ele].measure((ox, oy, width, height, px, py) => {
      this.setState({
        isVisible: true,
        eleVisible: ele,
        dataSource: this.getDSValues(),
        buttonRect: { x: px, y: py, width, height },
      });
    });
  }

  closePopover() {
    this.setState({
      eleVisible: null,
      dataSource: this.getDSValues(),
    });
  }

  isVisible(eleVisible, wrapper) {
    return eleVisible === wrapper;
  }

  render() {
    return (
      <View style={styles.timelineContainer}>
        <View style={styles.timelineHeader} />
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <View style={styles.container}>
                <TouchableHighlight
                  ref={(e) => { this[`${rowData.time}Wrapper`] = e; }}
                  style={styles.button} onPress={this.showPopover.bind(this, `${rowData.time}Wrapper`)}
                >
                  <View style={styles.toolbarHeader}>
                    <TouchableOpacity>
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
                    <Text style={styles.downArrow}>
                      <Icon name="ios-arrow-down-outline" size={15} />
                    </Text>
                  </View>
                </TouchableHighlight>
                <Popover
                  isVisible={this.isVisible(this.state.eleVisible, `${rowData.time}Wrapper`)}
                  eleVisible={this.state.eleVisible}
                  fromRect={this.state.buttonRect}
                  onClose={this.closePopover.bind(this)}
                >
                  <Text style={styles.popoverContent}>
                     {rowData.content}
                  </Text>
                </Popover>
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
