import {useContext} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../global/styles';
import {Button, Divider, Icon, Text} from '@rneui/themed';
import {UserContext} from '../../contexts/UserContext';
import {IOrder, OrderStatusEnum, useOrders} from '../../hooks/useOrders';
import {Timestamp, or} from 'firebase/firestore';
import {TranslateOrderStatusEnum} from './OrderCard';

interface OrderDetailsModalProps {
  isVisible: boolean;
  handleClose: () => void;
  order: IOrder;
}

export function OrderDetailsModal({
  isVisible,
  handleClose,
  order,
}: OrderDetailsModalProps) {
  const priceFormatter = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const transformPrice = (price: number) => priceFormatter.format(price);

  return (
    <Modal visible={isVisible} transparent onRequestClose={handleClose}>
      <TouchableOpacity
        style={{flex: 1, backgroundColor: '#00000050'}}
        onPress={handleClose}
        activeOpacity={0.9}
      />
      <View style={styles.absoluteContainer}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.title}>Detalhes do pedido</Text>
          </View>

          <Divider color={colors.orange} />

          <View style={{gap: 10}}>
            <View style={{gap: 3}}>
              <Text style={styles.nameLabel}>Feito por</Text>
              <Text style={styles.name}>{order.customerName}</Text>
            </View>
            <View style={{gap: 3}}>
              <Text style={styles.nameLabel}>Realizado em</Text>
              <Text style={styles.name}>{getDate(order.createdAt)}</Text>
            </View>
            <View style={{gap: 3}}>
              <Text style={styles.nameLabel}>Status</Text>
              <Text style={styles.name}>
                {TranslateOrderStatusEnum[order.status]}
              </Text>
            </View>
            <View style={{gap: 3}}>
              <Text style={styles.nameLabel}>Código de retirada</Text>
              <Text style={styles.name}>#{order.code}</Text>
            </View>
            {order.status === OrderStatusEnum.CANCELED && (
              <View style={{gap: 3}}>
                <Text style={styles.nameLabel}>
                  Motivo do cancelamento{' '}
                  {order.canceledByUser ? '(cancelado pelo cliente)' : null}
                </Text>
                <Text style={styles.name}>{order.cancelReason}</Text>
              </View>
            )}
          </View>

          <Divider color={colors.orange} />

          <ScrollView>
            <View style={{gap: 10, marginBottom: 10}}>
              {order.products.map((item, index) => (
                <View key={index}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemTitle}>{item}</Text>
                      <Text style={styles.itemPrice}>
                        {transformPrice(order.prices[index] * order.qtd[index])}
                      </Text>
                    </View>

                    <View style={styles.qtyContainer}>
                      <Text style={styles.qtdLabel}>Qtd</Text>
                      <Text style={styles.itemQty}>{order.qtd[index]}</Text>
                    </View>
                  </View>
                  <Divider color={colors.gray4} style={{marginTop: 10}} />
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Total</Text>
            <Text style={styles.itemPrice}> 
              {transformPrice(order.totalPrice)}
            </Text>
            <Button
              title="Fechar"
              buttonStyle={styles.outlineStyledButton}
              titleStyle={styles.outlineButtonTitle}
              onPress={handleClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const getDate = (timestamp: Timestamp) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const date = timestamp.toDate().toLocaleDateString('pt-BR', options);
  return date;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    width: '100%',
    borderRadius: 12,
    padding: 20,
    gap: 10,
    height: '90%',
  },

  absoluteContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'box-none',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.orange,
  },

  label: {
    color: colors.gray2,
  },

  text: {
    color: colors.gray3,
  },

  itemContainer: {
    gap: 5,
  },

  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.gray1,
  },

  itemPrice: {
    color: colors.gray2,
    fontSize: 12,
    fontWeight: 'bold',
  },

  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    gap: 10,
  },

  itemQty: {
    color: colors.gray2,
    fontSize: 12,
    width: 30,
    textAlign: 'right',
  },

  qtdLabel: {
    color: colors.orange,
    fontSize: 12,
  },

  confirmButton: {
    backgroundColor: '#ff8c52',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FfBc52',
    height: 40,
    paddingHorizontal: 10,
    minWidth: '45%',
  },

  confirmButtonTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -3,
  },

  outlineStyledButton: {
    backgroundColor: '#00000000',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ff8c52',
    height: 40,
    paddingHorizontal: 10,
    minWidth: '45%',
  },

  outlineButtonTitle: {
    color: '#ff8c52',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -3,
  },

  nameLabel: {
    fontWeight: 'bold',
    color: colors.gray1,
  },

  name: {
    color: colors.gray2,
  },
});
