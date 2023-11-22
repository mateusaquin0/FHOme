import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../global/styles';
import {Icon, Text} from '@rneui/themed';
import {OrderStatusEnum} from '../../hooks/useOrders';

interface FilterCardProps {
  status: OrderStatusEnum;
  isChecked: boolean;
  onPress: () => void;
}

enum TranslateStatusEnum {
  CANCELED = 'Cancelado',
  ANALYSIS = 'Em análise',
  PREPARATION = 'Em preparação',
  SEPARATE = 'Pronto para retirada',
  DELIVERED = 'Entregue',
}

export function FilterCard({status, isChecked, onPress}: FilterCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View
        style={{
          ...styles.container,
          backgroundColor: isChecked ? colors.orange : colors.cardBackground,
        }}>
        <Text style={{color: isChecked ? colors.gray1 : colors.gray3}}>
          {TranslateStatusEnum[status]}
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
