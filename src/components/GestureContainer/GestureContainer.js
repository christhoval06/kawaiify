import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanResponder, View } from 'react-native';

class GestureContainer extends Component {
  componentWillMount() {
    this.setupPanResponder();
  }

  setupPanResponder = () => {
    const {
      handlePanResponderGrant,
      handlePanResponderMove,
      handlePanResponderEnd,
    } = this.props;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,
      onPanResponderGrant:
        (event, gestureState) => handlePanResponderGrant(event, gestureState),
      onPanResponderMove:
        (event, gestureState) => handlePanResponderMove(event, gestureState),
      onPanResponderRelease:
        (event, gestureState) => handlePanResponderEnd(event, gestureState),
      onPanResponderTerminate:
        (event, gestureState) => handlePanResponderEnd(event, gestureState),
    });
  }

  render() {
    return (
      <View {...this.panResponder.panHandlers}>
        {...this.props.children}
      </View>
    );
  }
}

GestureContainer.propTypes = {
  handlePanResponderGrant: PropTypes.func.isRequired,
  handlePanResponderMove: PropTypes.func.isRequired,
  handlePanResponderEnd: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default GestureContainer;
