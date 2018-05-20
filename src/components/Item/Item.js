import React, { Component } from 'react';
import { PanResponder, Image } from 'react-native';

import styles from './styles.js';

class Item extends Component {
  state = {
    x: 0,
    y: 0,
    isSelected: false,
  }

  componentWillMount() {
    this.createPanResponder();
  }

  createPanResponder = () => {
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

  handlePanResponderGrant = () => {
    this.toggleSelected();
  }

  handlePanResponderMove = (event, gestureState) => {
    const { dx, dy } = gestureState;

    // TODO: Calculate accurate coordinates
    this.updatePosition(dx, dy);
  }

  handlePanResponderEnd = () => {
    this.toggleSelected();
  }

  toggleSelected = () => {
    this.setState({
      isSelected: !this.state.isSelected,
    });
  }

  updatePosition = (x, y) => {
    this.setState({ x, y });
  }

  render() {
    const { x, y, isSelected } = this.state;
    const { source } = this.props;
    const positionStyle = [
      { translateX: x },
      { translateY: y },
    ];

    return (
      <Image
        style={[
          styles.item,
          isSelected && styles.selected,
        ]}
        transform={positionStyle}
        source={source}
        {...this.panResponder.panHandlers}
      />
    );
  }
}

export default Item;
