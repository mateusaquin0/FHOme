import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import {db} from '../services/firebaseConfig';

export interface MenuItem {
  Nome: string;
  Descricao: string;
  Tipo: string;
  Preco: number;
  Disponivel: boolean;
  id?: string;
}

export function useMenu() {
  const getList = async (showAll: boolean, type?: string) => {
    const menu: MenuItem[] = [];

    const q = !showAll
      ? type
        ? query(
            collection(db, 'Produtos'),
            where('Disponivel', '==', true),
            where('Tipo', '==', type),
            orderBy('Preco'),
          )
        : query(
            collection(db, 'Produtos'),
            where('Disponivel', '==', true),
            orderBy('Preco'),
          )
      : type
      ? query(
          collection(db, 'Produtos'),
          where('Tipo', '==', type),
          orderBy('Preco'),
        )
      : query(collection(db, 'Produtos'), orderBy('Preco'));

    const querySnapshot = await getDocs(q)
      .then(res =>
        res.forEach(item => menu.push({...(item.data() as MenuItem)})),
      )
      .catch(error => console.log('menu', error));
      
    return menu;
  };

  const addProduct = async (product: MenuItem) => {
    const docRef = await addDoc(collection(db, 'Produtos'), product);

    const productRef = doc(db, 'Produtos', docRef.id);

    await updateDoc(productRef, {
      id: docRef.id,
    });
  };

  const updateProduct = async (product: MenuItem) => {
    const id = product.id!;
    const productRef = doc(db, 'Produtos', id);

    await updateDoc(productRef, {
      Nome: product.Nome,
      Descricao: product.Descricao,
      Tipo: product.Tipo,
      Preco: product.Preco,
      Disponivel: product.Disponivel,
    });
  };

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, 'Produtos', id));
  };

  return {getList, addProduct, updateProduct, deleteProduct};
}
