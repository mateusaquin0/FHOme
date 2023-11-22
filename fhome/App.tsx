import {View, StyleSheet, StatusBar} from 'react-native';
import {colors} from './src/global/styles';
import {RootNavigator} from './src/navigation/root';
import {UserProvider} from './src/contexts/UserContext';

export default function App() {
  return (
    <UserProvider>
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.statusBar}
        />

        <RootNavigator />
      </View>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
