import {Button, Text} from '@rneui/themed';
import {StyleSheet, View, FlatList} from 'react-native';
import {MenuCard} from './MenuCard';
import {colors} from '../../global/styles';
import {MenuItem, useMenu} from '../../hooks/useMenu';
import {LoadingScreen} from '../shared/LoadingScreen';
import {NoItems} from '../shared/NoItems';
import {AddEditProductModal} from './AddEditProductModal';
import {useState, useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {ConfirmModal} from '../shared/ConfirmModal';

interface MenuProps {
  products: MenuItem[];
  isLoading: boolean;
  reload: () => void;
}

export function Menu({products, isLoading, reload}: MenuProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleDelete, setIsVisibleDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem>();
  const [idToDelete, setIdToDelete] = useState('');
  const {userType} = useContext(UserContext);
  const {deleteProduct} = useMenu();

  const handleEdit = (product: MenuItem) => {
    setSelectedProduct(product);
    setIsVisible(true);
  };

  const handleDelete = (id: string) => {
    setIsVisibleDelete(true);
    setIdToDelete(id);
  };

  const handleClose = () => {
    setIsVisible(false);
    setIsVisibleDelete(false);
    setSelectedProduct(undefined);
  };

  const confirmDelete = () => {
    deleteProduct(idToDelete).then(() => reload());
    setIsVisibleDelete(false);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 35,
        }}>
        <Text style={styles.menuTitle}>Menu</Text>

        {userType === 'employee' && (
          <Button
            title="Add"
            onPress={() => {
              setIsVisible(true);
            }}
            buttonStyle={styles.addButton}
            titleStyle={styles.addButtonTitle}
          />
        )}
      </View>

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <FlatList
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={products}
            keyExtractor={item => item.id!}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item}) => (
              <MenuCard
                item={item}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item?.id!)}
              />
            )}
            ItemSeparatorComponent={() => <View style={{height: 5}} />}
            ListFooterComponent={() => <View style={{height: 5}} />}
            ListEmptyComponent={() => <NoItems />}
          />
        </View>
      )}

      {isVisible && (
        <AddEditProductModal
          isVisible={isVisible}
          handleClose={handleClose}
          product={selectedProduct}
          reload={reload}
        />
      )}
      {isVisibleDelete && (
        <ConfirmModal
          title="Excluir item"
          description="Tem certeza que deseja excluir esse item?"
          isVisible={isVisibleDelete}
          onConfirm={confirmDelete}
          onClose={handleClose}
        />
      )}
    </View>
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
