import { StyleSheet } from 'react-native';

export const CONSTANTS = {
  ITEM_HEIGHT: 96,
  DEFAULT_POSITION: 0,
  DESELECTED_BORDER_COLOR: 'none',
  DESELECTED_BORDER_WIDTH: 0,
  SELECTED_BORDER_COLOR: 'red',
  SELECTED_BORDER_WIDTH: 1,
};

const styles = StyleSheet.create({
  item: {
    position: 'absolute',
    width: CONSTANTS.ITEM_HEIGHT,
    resizeMode: 'contain',
  },
});

export default styles;
