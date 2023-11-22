import {useContext, useState} from 'react';
import {Text} from '@rneui/themed';
import {FlatList, View, StyleSheet} from 'react-native';
import {UserContext} from '../../contexts/UserContext';
import {LoadingScreen} from '../shared/LoadingScreen';
import {NoItems} from '../shared/NoItems';
import {IOrder, useOrders} from '../../hooks/useOrders';
import {colors} from '../../global/styles';
import {OrderCard} from './OrderCard';
import {CancelOrderModal} from './CancelOrderModal';

interface OrderListProps {
  orders: IOrder[];
  isLoading: boolean;
  reload: () => void;
}

export function OrderList({orders, isLoading, reload}: OrderListProps) {
  const {userType} = useContext(UserContext);
  const {cancelOrder} = useOrders();
  const [openCancel, setOpenCancel] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);

  const handleCancel = async (reason: string) => {
    await cancelOrder(orderToCancel!, reason, userType!);
    setOpenCancel(false);
    reload();
  };

  const handleOpenCancel = (id: string) => {
    setOrderToCancel(id);
    setOpenCancel(true);
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            height: 35,
          }}>
          <Text style={styles.menuTitle}>
            {userType === 'customer' ? 'Seus Pedidos' : 'Pedidos'}
          </Text>
        </View>

        {isLoading ? (
          <LoadingScreen />
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <FlatList
              horizontal={false}
              showsVerticalScrollIndicator={false}
              data={orders}
              keyExtractor={item => item.id!}
              contentContainerStyle={{flexGrow: 1}}
              renderItem={({item}) => (
                <OrderCard
                  item={item}
                  reload={reload}
                  onCancel={id => handleOpenCancel(id)}
                />
              )}
              ItemSeparatorComponent={() => <View style={{height: 5}} />}
              ListFooterComponent={() => <View style={{height: 5}} />}
              ListEmptyComponent={() => <NoItems />}
            />
          </View>
        )}
      </View>

      {openCancel && (
        <CancelOrderModal
          isVisible={openCancel}
          onClose={() => setOpenCancel(false)}
          onConfirm={handleCancel}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    gap: 10,
  },

  menuTitle: {
    fontSize: 18,
    color: colors.gray1,
  },

  addButton: {
    backgroundColor: '#ff8c52',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FfBc52',
  },

  addButtonTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: -3,
  },
});
