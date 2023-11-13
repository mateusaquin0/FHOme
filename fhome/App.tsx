import {View, StyleSheet, StatusBar} from 'react-native';
import {colors} from './src/global/styles';
import {RootNavigator} from './src/navigation/root';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.statusBar} />

      <RootNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
