import {Icon, Text} from '@rneui/themed';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TabStackParamList} from '../../navigation/clientTabs';
import {useEffect, useState, useContext, useCallback} from 'react';
import {NewOrderModal} from '../../components/Orders/NewOrderModal';
import {colors} from '../../global/styles';
import {OrderList} from '../../components/Orders/OrderList';
import {IOrder, OrderStatusEnum, useOrders} from '../../hooks/useOrders';
import {auth, db} from '../../services/firebaseConfig';
import {UserContext} from '../../contexts/UserContext';
import {OrderFilterSlider} from '../../components/Orders/OrderFilterSlider';

interface MyOrdersScreenProps
  extends NativeStackScreenProps<TabStackParamList, 'CustomerOrders'> {}

export function MyOrdersScreen({route}: MyOrdersScreenProps) {
  const params = route?.params;
  const firstName = auth.currentUser?.displayName?.split(' ', 2)[0];
  const {userType} = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(params.newOrder);
  const [orderList, setOrderList] = useState<IOrder[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [checkedStatus, setCheckedStatus] = useState<OrderStatusEnum | null>(
    null,
  );
  const {getListByUser, getAllList} = useOrders();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('blur', () => {
      navigation.setParams({newOrder: false});
      setIsVisible(false);
    });

    navigation.addListener('focus', () => {
      const tabParams: any = navigation.getState().routes[1].params;
      setIsVisible(tabParams?.newOrder!);
    });
  }, []);

  const fetchOrders = async (status: OrderStatusEnum | null = null) => {
    let list;
    setIsLoadingList(true);
    if (userType === 'customer') {
      list = await getListByUser(auth.currentUser?.uid!, status);
    } else {
      list = await getAllList(status);
    }
    setOrderList(list);
    setIsLoadingList(false);
  };

  useEffect(() => {
    fetchOrders(checkedStatus);
  }, []);

  const handleFilterStatus = async (status: OrderStatusEnum | null) => {
    setCheckedStatus(status);
    fetchOrders(status);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.name}>Olá, {firstName}</Text>
            <Text style={styles.ask}>
              {userType == 'customer'
                ? 'O que vamos pedir hoje?'
                : 'O que vamos preparar hoje?'}
            </Text>
          </View>
          <TouchableOpacity onPress={() => fetchOrders(checkedStatus)}>
            <Icon
              type="material-community"
              name="reload"
              color={colors.gray3}
            />
          </TouchableOpacity>
        </View>

        <View>
          <OrderFilterSlider
            checkedStatus={checkedStatus}
            handleStatus={handleFilterStatus}
          />
        </View>

        <View style={styles.container}>
          <OrderList
            isLoading={isLoadingList}
            orders={orderList}
            reload={() => fetchOrders(checkedStatus)}
          />
        </View>
      </View>

      <NewOrderModal
        isVisible={isVisible}
        handleClose={() => setIsVisible(false)}
        reload={() => fetchOrders(checkedStatus)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 50,
  },

  welcomeContainer: {
    paddingVertical: 5,
  },

  name: {
    color: colors.gray2,
    fontSize: 18,
  },

  ask: {
    color: colors.gray3,
    fontSize: 12,
  },
});
