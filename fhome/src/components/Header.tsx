import {StyleSheet, View} from 'react-native';
import {Icon, Text} from '@rneui/themed';

import {colors, parameters} from '../global/styles';

interface HeaderProps {
  title: string;
  showIcon?: boolean;
  iconType?: string;
  iconName?: string;
  onPress?: () => void;
}

export function Header({
  title,
  showIcon = true,
  iconType,
  iconName,
  onPress,
}: HeaderProps) {
  return (
    <View style={styles.header}>
      {showIcon && (
        <Icon
          type={iconType}
          name={iconName!}
          color={colors.headerText}
          onPress={onPress}
          size={28}
        />
      )}
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: colors.buttons,
    height: parameters.headerHeight,
    gap: 30,
    alignItems: 'center',
    paddingLeft: 10,
  },
  headerText: {
    color: colors.headerText,
    fontSize: 22,
    fontWeight: 'bold',
  },
});
