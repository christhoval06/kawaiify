import { StyleSheet } from 'react-native';

const foo = 'skyblue';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    width: '100%',
    backgroundColor: foo,
  },
  image: {
    flex: 2,
  },
});

export default styles;
