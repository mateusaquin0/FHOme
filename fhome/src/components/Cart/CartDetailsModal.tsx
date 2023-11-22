import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {UserContext} from '../../contexts/UserContext';
import {colors} from '../../global/styles';
import {useContext} from 'react';
import {Button, Divider, Icon, Text} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

interface CartDetailsModalProps {
  onClose: () => void;
  isVisible: boolean;
}

export function CartDetailsModal({onClose, isVisible}: CartDetailsModalProps) {
  const {userCart, addToCart, removeFromCart, clearCart} =
    useContext(UserContext);
  const {navigate} = useNavigation();

  const priceFormatter = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const transformPrice = (price: number) => priceFormatter.format(price);

  const handleConfirmOrder = () => {
    navigate('CustomerOrders', {newOrder: true});
    onClose();
  };

  return (
    <>
      <Modal visible={isVisible} transparent onRequestClose={onClose}>
        <TouchableOpacity
          style={{flex: 1, backgroundColor: '#00000050'}}
          onPress={onClose}
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
              <Text style={styles.title}>Carrinho</Text>
              <Button
                title="Limpar"
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
                        <TouchableOpacity>
                          <Icon
                            type="material-community"
                            name={item.qty > 1 ? 'minus' : 'trash-can-outline'}
                            color={colors.orange}
                            onPress={() => removeFromCart(item)}
                          />
                        </TouchableOpacity>
                        <Text style={styles.itemQty}>{item.qty}</Text>
                        <TouchableOpacity>
                          <Icon
                            type="material-community"
                            name="plus"
                            color={colors.orange}
                            onPress={() => addToCart(item)}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Divider color={colors.gray4} style={{marginTop: 10}} />
                  </View>
                ))}
              </View>
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}>
              <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>Total</Text>
                <Text style={styles.itemPrice}>
                  {transformPrice(userCart.totalPrice)}
                </Text>
              </View>

              <Button
                title="Continuar"
                buttonStyle={styles.confirmButton}
                titleStyle={styles.confirmButtonTitle}
                onPress={handleConfirmOrder}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
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
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.gray4,
    borderRadius: 5,
    elevation: 2,
    marginLeft: 10,
    padding: 5,
    backgroundColor: colors.cardBackground,
    width: 100,
  },

  itemQty: {
    color: colors.gray2,
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
  },

  confirmButtonTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },
});
