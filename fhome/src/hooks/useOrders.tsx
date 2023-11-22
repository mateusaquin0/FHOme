import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import {IUserCart, UserType} from '../contexts/UserContext';
import {auth, db} from '../services/firebaseConfig';
import {useEffect} from 'react';

export enum OrderStatusEnum {
  CANCELED = 'CANCELED',
  ANALYSIS = 'ANALYSIS',
  PREPARATION = 'PREPARATION',
  SEPARATE = 'SEPARATE',
  DELIVERED = 'DELIVERED',
}

export interface IOrder {
  customerName: string;
  customerId: string;
  products: string[];
  qtd: number[];
  prices: number[];
  totalPrice: number;
  createdAt: Timestamp;
  modifiedAt: Timestamp;
  status: OrderStatusEnum;
  readyAt: Timestamp | null;
  cancelReason: string | null;
  canceledByUser: boolean | null;
  id: string | null;
  code: number;
}

const orderCollection = 'Pedidos';

export function useOrders() {
  const getListByUser = async (
    userId: string,
    status: OrderStatusEnum | null = null,
  ) => {
    const orders: IOrder[] = [];

    const q =
      status !== null
        ? query(
            collection(db, orderCollection),
            where('customerId', '==', userId),
            where('status', '==', status),
            orderBy('modifiedAt', 'desc'),
          )
        : query(
            collection(db, orderCollection),
            where('customerId', '==', userId),
            orderBy('modifiedAt', 'desc'),
          );

    await getDocs(q)
      .then(res =>
        res.forEach(item => orders.push({...(item.data() as IOrder)})),
      )
      .catch(error => console.log('orders', error));

    return orders;
  };

  const getAllList = async (status: OrderStatusEnum | null = null) => {
    const orders: IOrder[] = [];

    const q =
      status !== null
        ? query(
            collection(db, orderCollection),
            where('status', '==', status),
            orderBy('modifiedAt', 'desc'),
          )
        : query(collection(db, orderCollection), orderBy('modifiedAt', 'desc'));

    await getDocs(q)
      .then(res =>
        res.forEach(item => orders.push({...(item.data() as IOrder)})),
      )
      .catch(error => console.log('orders', error));

    return orders;
  };

  const addOrder = async (cart: IUserCart) => {
    const productAray: string[] = [];
    const qtdArray: number[] = [];
    const pricesArray: number[] = [];
    const code = Math.floor(1000 + Math.random() * 9000);

    cart.items.forEach(item => {
      productAray.push(item.Nome);
      qtdArray.push(item.qty);
      pricesArray.push(item.Preco);
    });

    const order: IOrder = {
      customerName: auth.currentUser?.displayName!,
      customerId: auth.currentUser?.uid!,
      products: productAray,
      qtd: qtdArray,
      prices: pricesArray,
      totalPrice: cart.totalPrice,
      createdAt: Timestamp.fromDate(new Date()),
      modifiedAt: Timestamp.fromDate(new Date()),
      status: OrderStatusEnum.ANALYSIS,
      readyAt: null,
      cancelReason: null,
      canceledByUser: null,
      id: null,
      code,
    };

    const docRef = await addDoc(collection(db, orderCollection), order);

    const productRef = doc(db, orderCollection, docRef.id);

    await updateDoc(productRef, {
      id: docRef.id,
    });
  };

  const cancelOrder = async (
    id: string,
    reason: string,
    userType: UserType,
  ) => {
    const orderRef = doc(db, orderCollection, id);

    await updateDoc(orderRef, {
      cancelReason: reason,
      status: OrderStatusEnum.CANCELED,
      canceledByUser: userType === 'customer',
      modifiedAt: Timestamp.fromDate(new Date()),
    }).catch(error => console.error(error));
  };

  const confirmDelivery = async (id: string) => {
    const orderRef = doc(db, orderCollection, id);

    await updateDoc(orderRef, {
      status: OrderStatusEnum.DELIVERED,
      modifiedAt: Timestamp.fromDate(new Date()),
    }).catch(error => console.error(error));
  };

  const setPreparation = async (id: string) => {
    const orderRef = doc(db, orderCollection, id);

    await updateDoc(orderRef, {
      status: OrderStatusEnum.PREPARATION,
      modifiedAt: Timestamp.fromDate(new Date()),
    }).catch(error => console.error(error));
  };

  const setSeparate = async (id: string) => {
    const orderRef = doc(db, orderCollection, id);

    await updateDoc(orderRef, {
      status: OrderStatusEnum.SEPARATE,
      modifiedAt: Timestamp.fromDate(new Date()),
    }).catch(error => console.error(error));
  };

  return {
    getListByUser,
    getAllList,
    addOrder,
    cancelOrder,
    confirmDelivery,
    setPreparation,
    setSeparate,
  };
}
