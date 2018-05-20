import { StyleSheet } from 'react-native';

const itemHeight = 96;
const foo = 'red';
const bar = 'blue';

const styles = StyleSheet.create({
  item: {
    width: itemHeight,
    top: '50%',
    resizeMode: 'contain',
  },
  selected: {
    borderWidth: 1,
    borderColor: bar,
  },
});

export default styles;
