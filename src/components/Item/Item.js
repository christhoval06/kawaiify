import React, { Component } from 'react';
import { PanResponder, View, Image } from 'react-native';

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

    this.updateItemStyles(this.itemStyles, newStyles);
  }

  updateItemStyles = (itemStyles, newStyles) => {
    itemStyles.style = {
      ...itemStyles.style,
      ...newStyles,
    };
  }

  updateNativeStyles = (ref, newStyles) => {
    ref && ref.setNativeProps(newStyles);
  }

  handlePanResponderGrant = () => {
    this.selectItem();
  }

  selectItem = () => {
    const newStyles = {
      borderWidth: CONSTANTS.SELECTED_BORDER_WIDTH,
      borderColor: CONSTANTS.SELECTED_BORDER_COLOR,
    }

    this.updateItemStyles(this.itemStyles, newStyles);
    this.updateNativeStyles(this.item, this.itemStyles);
  }

  handlePanResponderMove = (event, gestureState) => {
    const { changedTouches } = event.nativeEvent;
    const isPinch = changedTouches.length > 1;

    if (isPinch) {
      [touch1, touch2] = changedTouches;
      this.processPinch(
        touch1.pageX,
        touch1.pageY,
        touch2.pageX,
        touch2.pageY
      );
    } else {
      const { dx, dy } = gestureState;

      this.processMove(dx, dy);
    }
  }

  processPinch = (x1, y1, x2, y2) => {
    // TODO: Implement scale functionality
  }

  processMove = (x, y) => {
    const newStyles = {
      left: this.previousLeft + x,
      top: this.previousTop + y,
    };

    this.updateItemStyles(this.itemStyles, newStyles);
    this.updateNativeStyles(this.item, this.itemStyles);
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

    this.updateItemStyles(this.itemStyles, newStyles);
    this.updateNativeStyles(this.item, this.itemStyles);
  }

  updatePrevious = (x, y) => {
    this.previousLeft += x;
    this.previousTop += y;
  }

  render() {
    const { source } = this.props;

    return (
      <View
        ref={item => this.item = item}
        style={styles.container}
        {...this.panResponder.panHandlers}
      >
        <Image
          style={styles.image}
          source={source}
        />
      </View>
    );
  }
}

export default Item;
