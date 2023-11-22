import {collection, getDocs, query, where} from 'firebase/firestore';
import {db} from '../services/firebaseConfig';

export interface IUser {
  id: string;
  email: string;
  name: string;
  isEmployee: boolean;
}

export function useUser() {
  const getUser = async (userId: string) => {
    let user: IUser = {} as IUser;

    const q = query(collection(db, 'Usuarios'), where('id', '==', userId));

    await getDocs(q)
      .then(res =>
        res.forEach(u => {
          user = u.data() as unknown as IUser;
        }),
      )
      .catch(error => console.log('user', error));

    return user;
  };

  return {getUser};
}
