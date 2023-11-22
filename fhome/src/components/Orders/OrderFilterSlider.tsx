import {FlatList, StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';
import {Button, Text} from '@rneui/themed';
import {colors} from '../../global/styles';
import {OrderStatusEnum} from '../../hooks/useOrders';
import {FilterCard} from './FilterCard';

interface OrderFilterSliderProps {
  handleStatus: (status: OrderStatusEnum | null) => void;
  checkedStatus: string | null;
}

const statusList = [
  OrderStatusEnum.ANALYSIS,
  OrderStatusEnum.PREPARATION,
  OrderStatusEnum.SEPARATE,
  OrderStatusEnum.DELIVERED,
  OrderStatusEnum.CANCELED,
];

export function OrderFilterSlider({
  handleStatus,
  checkedStatus,
}: OrderFilterSliderProps) {
  return (
    <View style={styles.categoriesContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.categoriesTitle}>Filtrar por status</Text>
        <Button
          title="Todos"
          type="clear"
          onPress={() => handleStatus(null)}
          titleStyle={{
            color: !checkedStatus ? colors.orange : colors.gray4,
            ...styles.viewAll,
          }}
        />
      </View>

      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={statusList}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <FilterCard
              status={item}
              isChecked={checkedStatus === item}
              onPress={() => {
                handleStatus(item);
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={{width: 5}} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoriesContainer: {
    gap: 10,
    marginHorizontal: 10,
  },

  categoriesTitle: {
    fontSize: 18,
    color: colors.gray1,
  },

  viewAll: {
    fontSize: 14,
  },
});
