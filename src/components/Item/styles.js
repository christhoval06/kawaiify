import { StyleSheet } from 'react-native';

export const CONSTANTS = {
  ITEM_WIDTH: 64,
  DEFAULT_POSITION: 0,
  DESELECTED_BORDER_COLOR: 'none',
  DESELECTED_BORDER_WIDTH: 0,
  SELECTED_BORDER_COLOR: 'red',
  SELECTED_BORDER_WIDTH: 1,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: 16,
  },
  image: {
    flex: 1,
    width: CONSTANTS.ITEM_WIDTH,
    resizeMode: 'contain',
  },
});

export default styles;
