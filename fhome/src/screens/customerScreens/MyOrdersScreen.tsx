import {Text} from '@rneui/themed';
import {StyleSheet, View} from 'react-native';

export function MyOrdersScreen() {
  return (
    <View style={styles.container}>
      <Text>MY ORDERS</Text>
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
