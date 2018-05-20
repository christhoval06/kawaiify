import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';

import { GestureContainer } from './../';

import styles, { CONSTANTS } from './styles.js';

// https://github.com/facebook/react-native/blob/master/RNTester/js/PanResponderExample.js
class Item extends Component {
  previousTop = CONSTANTS.DEFAULT_POSITION
  previousLeft = CONSTANTS.DEFAULT_POSITION
  previousWidth = CONSTANTS.ITEM_WIDTH
  itemStyles = { styles: {} }
  imageStyles = { styles: {} }

  componentWillMount() {
    this.setupStyles();
  }

  componentDidMount() {
    this.updateNativeStyles(this.item, this.itemStyles);
    this.updateNativeStyles(this.image, this.imageStyles);
  }

  setupStyles = () => {
    const newItemStyles = {
      left: this.previousTop,
      top: this.previousLeft,
      borderWidth: CONSTANTS.DESELECTED_BORDER_WIDTH,
      borderColor: CONSTANTS.DESELECTED_BORDER_COLOR,
    };

    const newImageStyles = {
      width: this.previousWidth,
    };

    this.updateStylesObject(this.itemStyles, newItemStyles);
    this.updateStylesObject(this.imageStyles, newImageStyles);
  }

  updateStylesObject = (ref, newStyles) => {
    ref.style = {
      ...ref.style,
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

    this.updateStylesObject(this.itemStyles, newStyles);
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
    const newStyles = {
      // TODO: Also scale height
      width: this.calculateDistance(x1, y1, x2, y2),
    };

    this.updateStylesObject(this.imageStyles, newStyles);
    this.updateNativeStyles(this.image, this.imageStyles);
  }

  calculateDistance = (x1, y1, x2, y2) => {
    const x = x1 - x2;
    const y = y1 - y2;

    return Math.sqrt( x * x + y * y );
  }

  processMove = (x, y) => {
    const newStyles = {
      left: this.previousLeft + x,
      top: this.previousTop + y,
    };

    this.updateStylesObject(this.itemStyles, newStyles);
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

    this.updateStylesObject(this.itemStyles, newStyles);
    this.updateNativeStyles(this.item, this.itemStyles);
  }

  updatePrevious = (x, y) => {
    this.previousLeft += x;
    this.previousTop += y;
  }

  render() {
    const { source } = this.props;

    return (
      <GestureContainer
        handlePanResponderGrant={this.handlePanResponderGrant}
        handlePanResponderMove={this.handlePanResponderMove}
        handlePanResponderEnd={this.handlePanResponderEnd}
      >
        <View
          ref={item => this.item = item}
          style={styles.container}
        >
          <Image
            ref={image => this.image = image}
            style={styles.image}
            source={source}
          />
        </View>
      </GestureContainer>
    );
  }
};

Item.propTypes = {
  source: PropTypes.number.isRequired,
};

export default Item;
