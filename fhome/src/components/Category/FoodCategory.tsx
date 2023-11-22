import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../global/styles';
import {Icon, Text} from '@rneui/themed';

interface FoodCategoryProps {
  categoryName: string;
  isChecked: boolean;
  iconName?: string;
  onPress: () => void;
}

export function FoodCategory({
  categoryName,
  iconName,
  isChecked,
  onPress,
}: FoodCategoryProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View
        style={{
          ...styles.container,
          backgroundColor: isChecked ? colors.orange : colors.cardBackground,
        }}>
        {!!iconName && (
          <Icon
            type="material-community"
            name={iconName}
            color={isChecked ? colors.gray1 : colors.gray3}
          />
        )}
        <Text style={{color: isChecked ? colors.gray1 : colors.gray3}}>
          {categoryName}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.gray4,
    height: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
    marginVertical: 5,
  },
});
