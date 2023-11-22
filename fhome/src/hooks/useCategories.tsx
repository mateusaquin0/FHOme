import {collection, getDocs, orderBy, query} from 'firebase/firestore';
import {db} from '../services/firebaseConfig';

export interface Category {
  Nome: string;
  Icone: string;
  id: string;
  Ranking: number;
}

export const useCategories = () => {
  const getList = async () => {
    const categories: Category[] = [];

    const q = query(
      collection(db, 'foodCategories'),
      orderBy('Ranking', 'asc'),
    );

    const querySnapshot = await getDocs(q)
      .then(res => {
        res.forEach(item =>
          categories.push({...(item.data() as Category), id: item.id}),
        );
      })
      .catch(error => console.log('category', error));

    return categories;
  };

  return {getList};
};
