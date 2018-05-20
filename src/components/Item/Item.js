import React, { Component } from 'react';
import { PanResponder, Image } from 'react-native';

import styles, { CONSTANTS } from './styles.js';

// https://github.com/facebook/react-native/blob/master/RNTester/js/PanResponderExample.js
class Item extends Component {
  previousTop = CONSTANTS.DEFAULT_POSITION
  previousLeft = CONSTANTS.DEFAULT_POSITION
  itemStyles = { styles: {} }

  componentWillMount() {
    this.setupPanResponder();
    this.setupStyles();
  }

  componentDidMount() {
    this.updateNativeStyles();
  }

  setupPanResponder = () => {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    });
  }

  setupStyles = () => {
    const newStyles = {
      left: this.previousTop,
      top: this.previousLeft,
      borderWidth: CONSTANTS.DESELECTED_BORDER_WIDTH,
      borderColor: CONSTANTS.DESELECTED_BORDER_COLOR,
    };

    this.updateItemStyles(newStyles);
  }

  updateItemStyles = (newStyles) => {
    this.itemStyles.style = {
      ...this.itemStyles.style,
      ...newStyles,
    }
  }

  updateNativeStyles = () => {
    this.item && this.item.setNativeProps(this.itemStyles);
  }

  handlePanResponderGrant = () => {
    this.selectItem();
  }

  selectItem = () => {
    const newStyles = {
      borderWidth: CONSTANTS.SELECTED_BORDER_WIDTH,
      borderColor: CONSTANTS.SELECTED_BORDER_COLOR,
    }

    this.updateItemStyles(newStyles);
    this.updateNativeStyles();
  }

  handlePanResponderMove = (event, gestureState) => {
    const { dx, dy } = gestureState;
    const newStyles = {
      left: this.previousLeft + dx,
      top: this.previousTop + dy,
    };

    this.updateItemStyles(newStyles);
    this.updateNativeStyles();
  }

  handlePanResponderEnd = (event, gestureState) => {
    const { dx, dy } = gestureState;

    this.deselectItem();
    this.updatePrevious(dx, dy);
  }

  deselectItem = () => {
    const newStyles = {
      borderWidth: CONSTANTS.DESELECTED_BORDER_WIDTH,
      borderColor: CONSTANTS.DESELECTED_BORDER_COLOR,
    }

    this.updateItemStyles(newStyles);
    this.updateNativeStyles();
  }

  updatePrevious = (x, y) => {
    this.previousLeft += x;
    this.previousTop += y;
  }

  render() {
    const { source } = this.props;

    return (
      <Image
        source={source}
        ref={item => this.item = item}
        style={styles.item}
        {...this.panResponder.panHandlers}
      />
    );
  }
}

export default Item;
