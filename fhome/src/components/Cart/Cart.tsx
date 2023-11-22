import {Button, Text} from '@rneui/themed';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../global/styles';
import {IUserCart, UserContext} from '../../contexts/UserContext';
import {useContext, useState} from 'react';
import {CartDetailsModal} from './CartDetailsModal';

interface CartProps {}

export function Cart({}: CartProps) {
  const {userCart} = useContext(UserContext);
  const [seeDetails, setSeeDetails] = useState(false);

  const priceFormatter = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const price = priceFormatter.format(userCart.totalPrice);

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.price}>
            {price}
            <Text style={styles.qtdItems}>
              / {userCart.totalItems}{' '}
              {userCart.totalItems > 1 ? 'itens' : 'item'}
            </Text>
          </Text>
        </View>
        <Button
          title="Ver carrinho"
          buttonStyle={styles.cartButton}
          titleStyle={styles.cartButtonTitle}
          onPress={() => setSeeDetails(true)}
        />
      </View>

      {seeDetails && (
        <CartDetailsModal
          isVisible={seeDetails}
          onClose={() => setSeeDetails(false)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flexDirection: 'row',
    height: 70,
    borderWidth: 1,
    borderColor: colors.gray5,
    backgroundColor: colors.cardBackground,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  cartButton: {
    backgroundColor: '#ff8c52',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FfBc52',
    height: 40,
    paddingHorizontal: 10,
  },

  cartButtonTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },

  total: {
    color: colors.gray2,
    fontSize: 14,
  },

  price: {
    color: colors.gray1,
    fontSize: 18,
    fontWeight: 'bold',
  },

  qtdItems: {
    color: colors.gray2,
    fontSize: 12,
  },
});
