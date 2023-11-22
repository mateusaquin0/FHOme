import {Icon, Text} from '@rneui/themed';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {colors} from '../../global/styles';
import {MenuItem} from '../../hooks/useMenu';
import {UserContext} from '../../contexts/UserContext';
import {useContext} from 'react';

interface MenuCardprops {
  item: MenuItem;
  onEdit: () => void;
  onDelete: () => void;
}

export function MenuCard({item, onEdit, onDelete}: MenuCardprops) {
  const {userType, addToCart} = useContext(UserContext);

  const priceFormatter = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const price = priceFormatter.format(item.Preco);

  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View style={styles.container}>
        <View style={{flexBasis: '60%', gap: 2}}>
          <Text style={styles.title}>{item.Nome}</Text>
          <Text style={styles.description}>{item.Descricao}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Text style={styles.price}>{price}</Text>
            {userType === 'employee' && (
              <Icon
                type="material-community"
                name={item.Disponivel ? 'check-circle-outline' : 'block-helper'}
                color={item.Disponivel ? colors.green : colors.gray3}
                size={item.Disponivel ? 18 : 15}
              />
            )}
          </View>
        </View>
        <View>
          {userType === 'customer' ? (
            <TouchableOpacity>
              <Icon
                type="material-community"
                name="cart-arrow-down"
                color={colors.orange}
                onPress={() => addToCart(item)}
              />
            </TouchableOpacity>
          ) : (
            <View style={{flexDirection: 'row', gap: 15}}>
              <TouchableOpacity>
                <Icon
                  type="material-community"
                  name="square-edit-outline"
                  color={colors.orange}
                  onPress={onEdit}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Icon
                  type="material-community"
                  name="trash-can-outline"
                  color={colors.orange}
                  onPress={onDelete}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.gray4,
    minHeight: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 30,
    borderRadius: 10,
    backgroundColor: colors.cardBackground,
    elevation: 1
  },

  title: {
    fontSize: 16,
    color: colors.gray1,
  },

  description: {
    fontSize: 12,
    color: colors.gray3,
    fontStyle: 'italic',
  },

  price: {
    color: colors.gray1,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
