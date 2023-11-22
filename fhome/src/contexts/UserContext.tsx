import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import {MenuItem} from '../hooks/useMenu';
import {Category} from '../hooks/useCategories';
import cloneDeep from 'lodash/cloneDeep';

export type UserType = 'customer' | 'employee';

interface IUserContext {
  userType: UserType | undefined;
  setUserType: Dispatch<SetStateAction<UserType | undefined>>;
  userCart: IUserCart;
  addToCart: (product: MenuItem | ItemInCart) => void;
  removeFromCart: (product: ItemInCart) => void;
  clearCart: () => void;
  categoriesList: Category[];
  setCategoriesList: Dispatch<SetStateAction<Category[]>>;
}

export interface IUserCart {
  items: ItemInCart[];
  totalItems: number;
  totalPrice: number;
}

interface ItemInCart {
  Nome: string;
  qty: number;
  Preco: number;
}

const defaultCart: IUserCart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const UserContext = createContext<IUserContext>({} as IUserContext);

export function UserProvider({children}: any) {
  const [userType, setUserType] = useState<UserType>();
  const [userCart, setUserCart] = useState<IUserCart>(defaultCart);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  const addToCart = (product: MenuItem | ItemInCart) => {
    setUserCart(prev => {
      const newCart: IUserCart = cloneDeep(prev);
      const foundItem = newCart.items.find(i => i.Nome === product.Nome);
      const index = foundItem ? newCart.items.indexOf(foundItem) : -1;

      if (index >= 0) {
        newCart.items[index].qty += 1;
      } else {
        newCart.items.push({Nome: product.Nome, qty: 1, Preco: product.Preco});
      }

      newCart.totalItems += 1;
      newCart.totalPrice += product.Preco;

      return {...newCart};
    });
  };

  const removeFromCart = (product: ItemInCart) => {
    setUserCart(prev => {
      const newCart: IUserCart = cloneDeep(prev);
      const foundItem = newCart.items.find(i => i.Nome === product.Nome);
      const index = foundItem ? newCart.items.indexOf(foundItem) : -1;

      if (index >= 0) {
        if (newCart.items[index].qty === 1) newCart.items.splice(index, 1);
        else newCart.items[index].qty -= 1;
      }

      newCart.totalItems -= 1;
      newCart.totalPrice -= product.Preco;

      return {...newCart};
    });
  };

  const clearCart = () => {
    setUserCart(defaultCart);
  };

  return (
    <UserContext.Provider
      value={{
        userType,
        setUserType,
        userCart,
        addToCart,
        categoriesList,
        setCategoriesList,
        removeFromCart,
        clearCart,
      }}>
      {children}
    </UserContext.Provider>
  );
}
