import {Icon, Text} from '@rneui/themed';
import {View, StyleSheet} from 'react-native';
import {colors} from '../../global/styles';

export function NoItems() {
  const text = 'Que pena, não encontramos nada';

  return (
    <View style={styles.container}>
      <Icon
        type="material-community"
        name="emoticon-sad-outline"
        color={colors.gray3}
        size={60}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: colors.gray3,
  },
});
