/* global document */
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  View,
  Easing,
} from 'react-native';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  right: PropTypes.bool,
  isOpen: PropTypes.bool,
  handleView: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    opacity: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  containerVisible: {
    opacity: 1,
  },
  background: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popover: {
    backgroundColor: 'red',
    position: 'absolute',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.8,
  },
  content: {
    borderRadius: 3,
    padding: 6,
    backgroundColor: '#fff',
  },
  arrow: {
    position: 'absolute',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
});

class Pop extends Component {
  constructor(props) {
    super();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
    this.domNode = null;
    this.state = {
      isOpen: props.isOpen !== undefined ? props.isOpen : false,
    };
  }

  componentDidMount() {
  //  document.addEventListener('click', this.handleClickOutside, false);
  }

  componentWillUnmount() {
  //  document.removeEventListener('click', this.handleClickOutside, false);
  }

  handleClickOutside(e) {
    const { domNode } = this;
    const { isOpen } = this.state;
    if (e.target.className === 'ion-close') return;
    if (isOpen
    && ((!domNode || !domNode.contains(e.target)) || e.target.tagName === 'A')) {
      this.setState({ isOpen: false });
    }
  }

  toggleIsOpen(e) {
    e.preventDefault();
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
    if (this.props.handleView) {
      this.props.handleView(this.state.isOpen);
    }
  }

  renderPanel() {
    const { isOpen } = this.state;
    const { children } = this.props;

    if (isOpen) {
      return (
        <View>
          {children.slice(1).map((child) =>
            child
          )}
        </View>
      );
    }

    return null;
  }

  render() {
    const { children, right } = this.props;
    const { isOpen } = this.state;
    const className = this.props.className || '';

    return (
      <TouchableWithoutFeedback onPress={this.toggleIsOpen}>
        <View style={[styles.container, styles.containerVisible]}>
          <Animated.View style={[styles.background]} />
          <Animated.View
            style={[styles.popover, {
            }]}
          >
            <Animated.View />
            <Animated.View
              ref={node => (this.domNode = node)}
            >
              {children[0]}
              {this.renderPanel()}
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Pop.propTypes = propTypes;

export default Pop;
