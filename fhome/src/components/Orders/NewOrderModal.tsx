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
import {useOrders} from '../../hooks/useOrders';

interface NewOrderModalProps {
  isVisible: boolean;
  handleClose: () => void;
  reload: () => void;
}

export function NewOrderModal({
  isVisible,
  handleClose,
  reload,
}: NewOrderModalProps) {
  const {userCart, clearCart} = useContext(UserContext);
  const {addOrder} = useOrders();

  const priceFormatter = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const transformPrice = (price: number) => priceFormatter.format(price);

  const handleConfirm = () => {
    addOrder(userCart).then(() => {
      handleClose();
      clearCart();
      reload();
    });
  };

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
            <Text style={styles.title}>Novo pedido</Text>
            <Button
              title="Limpar carrinho"
              type="clear"
              onPress={clearCart}
              titleStyle={{
                color: colors.orange,
                fontSize: 12,
              }}
            />
          </View>
          <Divider color={colors.orange} />

          <ScrollView>
            <View style={{gap: 10, marginBottom: 10}}>
              {userCart.items.map(item => (
                <View key={item.Nome}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    key={item.Nome}>
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemTitle}>{item.Nome}</Text>
                      <Text style={styles.itemPrice}>
                        {transformPrice(item.Preco * item.qty)}
                      </Text>
                    </View>

                    <View style={styles.qtyContainer}>
                      <Text style={styles.qtdLabel}>Qtd</Text>
                      <Text style={styles.itemQty}>{item.qty}</Text>
                    </View>
                  </View>
                  <Divider color={colors.gray4} style={{marginTop: 10}} />
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={styles.itemContainer}>
            <View>
              <Text style={styles.itemTitle}>Tempo de preparo</Text>
              <Text style={styles.text}>
                {10} - {15} minutos
              </Text>
            </View>

            <Text style={styles.itemTitle}>Total</Text>
            <Text style={styles.itemPrice}>
              {transformPrice(userCart.totalPrice)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}>
            <Button
              title="Pedir mais"
              buttonStyle={styles.outlineStyledButton}
              titleStyle={styles.outlineButtonTitle}
              onPress={handleClose}
            />
            <Button
              title="Confirmar pedido"
              buttonStyle={styles.confirmButton}
              titleStyle={styles.confirmButtonTitle}
              onPress={handleConfirm}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

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
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray1,
  },

  itemPrice: {
    color: colors.gray2,
    fontSize: 14,
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
    fontSize: 14,
    width: 30,
    textAlign: 'right',
  },

  qtdLabel: {
    color: colors.orange,
    fontSize: 14,
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
});
