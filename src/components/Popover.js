/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  View,
  Easing,
} from 'react-native';

const noop = () => {};

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
    backgroundColor: '#EFEFEF',
    position: 'absolute',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
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

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const DEFAULT_ARROW_SIZE = new Size(10, 5);

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Size(width, height) {
  this.width = width;
  this.height = height;
}

function Rect(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

const propTypes = {
  children: PropTypes.object,
  fromRect: PropTypes.object,
  eleVisible: PropTypes.string,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
};

class Popover extends Component {

  constructor(props) {
    super();
    this.isVisible = props.isVisible;
    this.eleVisible = props.eleVisible;
    this.displayArea = new Rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.arrowSize = DEFAULT_ARROW_SIZE;
    this.placement = 'auto';
    this.onClose = noop;

    this.state = {
      contentSize: {},
      anchorPoint: {},
      popoverOrigin: {},
      placement: 'auto',
      isTransitioning: false,
      defaultAnimatedValues: {
        scale: new Animated.Value(0),
        translate: new Animated.ValueXY(),
        fade: new Animated.Value(0),
      },
    };
  }

  // getArrowRotation(placement) {
  //   switch (placement) {
  //     case 'bottom':
  //       return '180deg';
  //     case 'left':
  //       return '-90deg';
  //     case 'right':
  //       return '90deg';
  //     default:
  //       return '90deg';
  //   }
  // }

  // getArrowDynamicStyle() {
  //   const { anchorPoint, popoverOrigin } = this.state;
  //   const arrowSize = this.arrowSize;
  //
  //   // Create the arrow from a rectangle with the appropriate borderXWidth set
  //   // A rotation is then applied dependending on the placement
  //   // Also make it slightly bigger
  //   // to fix a visual artifact when the popover is animated with a scale
  //   const width = arrowSize.width + 2;
  //   const height = arrowSize.height * 2 + 2;
  //
  //   return {
  //     left: anchorPoint.x - popoverOrigin.x - width / 2,
  //     top: anchorPoint.y - popoverOrigin.y - height / 2,
  //     width,
  //     height,
  //     borderTopWidth: height / 2,
  //     borderRightWidth: width / 2,
  //     borderBottomWidth: height / 2,
  //     borderLeftWidth: width / 2,
  //   };
  // }

  componentWillReceiveProps(nextProps:any) {
    const willBeVisible = nextProps.isVisible;
    const {
      isVisible,
    } = this.props;

    if (willBeVisible !== isVisible) {
      if (willBeVisible) {
        // We want to start the show animation only when contentSize is known
        // so that we can have some logic depending on the geometry
        this.setState({ contentSize: {}, isAwaitingShow: true });
      } else {
        this.startAnimation.bind(this, { show: false });
      }
    }
  }

  getTranslateOrigin() {
    const { contentSize, popoverOrigin, anchorPoint } = this.state;
    const popoverCenter = new Point(popoverOrigin.x + contentSize.width / 2,
      popoverOrigin.y + contentSize.height / 2);
    return new Point(anchorPoint.x - popoverCenter.x, anchorPoint.y - popoverCenter.y);
  }

  measureContent(x) {
    const { width, height } = x.nativeEvent.layout;
    const contentSize = { width, height };

    const isAwaitingShow = this.state.isAwaitingShow;
    this.setState({ contentSize, isAwaitingShow: undefined }, () => {
      // Once state is set, call the showHandler so it can access all the geometry
      // from the state
      isAwaitingShow && this.startAnimation.bind(this, { show: true });
    });
  }

  startAnimation({ show }) {
    const handler = this.startDefaultAnimation;
    handler({ show, doneCallback: () => this.setState({ isTransitioning: false }) });
    this.setState({ isTransitioning: true });
  }

  startDefaultAnimation({ show, doneCallback }) {
    const animDuration = 300;
    const values = this.state.defaultAnimatedValues;
    const translateOrigin = this.getTranslateOrigin();

    if (show) {
      values.translate.setValue(translateOrigin);
    }

    const commonConfig = {
      duration: animDuration,
      easing: show ? Easing.out(Easing.back()) : Easing.inOut(Easing.quad),
    };

    Animated.parallel([
      Animated.timing(values.fade, {
        toValue: show ? 1 : 0,
        ...commonConfig,
      }),
      Animated.timing(values.translate, {
        toValue: show ? new Point(0, 0) : translateOrigin,
        ...commonConfig,
      }),
      Animated.timing(values.scale, {
        toValue: show ? 1 : 0,
        ...commonConfig,
      }),
    ]).start(doneCallback);
  }

  // getDefaultAnimatedStylesstartAnimation() {
  //   // If there's a custom animation handler,
  //   // we don't return the default animated styles
  //   if (typeof this.props.startCustomAnimation !== 'undefined') {
  //     return null;
  //   }
  //
  //   const animatedValues = this.state.defaultAnimatedValues;
  //
  //   return {
  //     backgroundStyle: {
  //       opacity: animatedValues.fade,
  //     },
  //     arrowStyle: {
  //       transform: [
  //         {
  //           scale: animatedValues.scale.interpolate({
  //             inputRange: [0, 1],
  //             outputRange: [0, 1],
  //             extrapolate: 'clamp',
  //           }),
  //         },
  //       ],
  //     },
  //     contentStyle: {
  //       transform: [
  //         { translateX: animatedValues.translate.x },
  //         { translateY: animatedValues.translate.y },
  //         { scale: animatedValues.scale },
  //       ],
  //     },
  //   };
  // }

  // _getExtendedStyles() {
  //   const background = [];
  //   const popover = [];
  //   const arrow = [];
  //   const content = [];
  //
  //   [this.getDefaultAnimatedStylesstartAnimation(), this.props].forEach((source) => {
  //     if (source) {
  //       background.push(source.backgroundStyle);
  //       popover.push(source.popoverStyle);
  //       arrow.push(source.arrowStyle);
  //       content.push(source.contentStyle);
  //     }
  //   });
  //
  //   return {
  //     background,
  //     popover,
  //     arrow,
  //     content,
  //   }
  // }

  render() {
    if (!this.props.isVisible && !this.state.isTransitioning) {
      return null;
    }

    const { popoverOrigin } = this.state;
  //  const extendedStyles = this._getExtendedStyles();
  //  const contentStyle = [styles.content, ...extendedStyles.content];
  //  const arrowColor = StyleSheet.flatten(contentStyle).backgroundColor;
  //  const arrowColorStyle = this.getArrowColorStyle(arrowColor);
  //  const arrowDynamicStyle = this.getArrowDynamicStyle();
    const contentSizeAvailable = this.state.contentSize.width;

    // Special case, force the arrow rotation even if it was overriden
    // let arrowStyle = [styles.arrow, arrowDynamicStyle];
    // const arrowTransform = (StyleSheet.flatten(arrowStyle).transform || []).slice(0);
    // arrowTransform.unshift({ rotate: this.getArrowRotation(placement) });
    // arrowStyle = [...arrowStyle, { transform: arrowTransform }];

    return (
      <TouchableWithoutFeedback onPress={this.props.onClose}>
        <View style={[styles.container, contentSizeAvailable && styles.containerVisible]}>
          <Animated.View style={[styles.background]} />
          <Animated.View
            style={[styles.popover, {
              top: popoverOrigin.y,
              left: popoverOrigin.x,
            }]}
          >
            <Animated.View />
            <Animated.View
              ref={(e) => { this.content = e; }}
              onLayout={this.measureContent.bind(this)}
            >
              {this.props.children}
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Popover.propTypes = propTypes;

export default Popover;
