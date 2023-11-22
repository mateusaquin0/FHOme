import {useEffect, useState, useContext} from 'react';
import {Icon, Text} from '@rneui/themed';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {auth} from '../../services/firebaseConfig';
import {colors} from '../../global/styles';
import {Cart} from '../../components/Cart/Cart';
import {CategorySlider} from '../../components/Category/CategorySlider';
import {Category, useCategories} from '../../hooks/useCategories';
import {Menu} from '../../components/Menu/Menu';
import {LoadingScreen} from '../../components/shared/LoadingScreen';
import {MenuItem, useMenu} from '../../hooks/useMenu';
import {useUser} from '../../hooks/useUser';
import {UserContext} from '../../contexts/UserContext';
import {signOut} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';

export function HomeScreen() {
  const firstName = auth.currentUser?.displayName?.split(' ', 2)[0];
  const [checkedCategory, setCheckedCategory] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuProducts, setMenuProducts] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const {reset} = useNavigation();

  const {setUserType, userType, setCategoriesList, userCart} =
    useContext(UserContext);

  const fetchAll = async () => {
    setIsLoading(true);
    Promise.all([fetchCategories(), fetchUser()])
      .then(async () => {
        await fetchProducts(checkedCategory);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  };

  const fetchUser = async () => {
    const {getUser} = useUser();
    const user = await getUser(auth.currentUser?.uid!);
    setUserType(user.isEmployee ? 'employee' : 'customer');
  };

  const fetchCategories = async () => {
    const {getList} = useCategories();
    const list = await getList();
    setCategories(list);
    setCategoriesList(list);
  };

  const fetchProducts = async (type?: string) => {
    console.log(type);
    const showAll = userType === 'employee';
    setIsLoadingMenu(true);
    const {getList} = useMenu();
    const res = await getList(showAll, type);
    setIsLoadingMenu(false);
    setMenuProducts(res);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleCategory = (name: string) => {
    setCheckedCategory(name);
    fetchProducts(name);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginBottom: 20,
          height: 50,
        }}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.name}>Olá, {firstName}</Text>
          <Text style={styles.ask}>
            {userType == 'customer'
              ? 'O que vamos pedir hoje?'
              : 'O que vamos preparar hoje?'}
          </Text>
        </View>

        <View>
          <TouchableOpacity onPress={fetchAll}>
            <Icon
              type="material-community"
              name="reload"
              color={colors.gray3}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          ...styles.screenContainer,
          marginBottom: userCart.totalItems ? 70 : 0,
        }}>
        <CategorySlider
          categories={categories}
          handleCategory={handleCategory}
          checkedCategory={checkedCategory}
        />

        <Menu
          products={menuProducts}
          isLoading={isLoadingMenu}
          reload={() => fetchProducts(checkedCategory)}
        />
      </View>

      {!!userCart.totalItems && (
        <View style={styles.cartContainer}>
          <Cart />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  screenContainer: {
    flex: 1,
    gap: 20,
  },

  cartContainer: {
    zIndex: 10,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
    width: '100%',
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
