import { StyleSheet } from 'react-native';

const foo = 'tomato';
const bar = 'mediumaquamarine';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: foo,
  },
  image: {
    flex: 2,
    backgroundColor: bar,
  },
});

export default styles;
