import {Text} from '@rneui/themed';
import {StyleSheet, View} from 'react-native';

export function MyAccountScreen() {
  return (
    <View style={styles.container}>
      <Text>MY ACCOUNT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
