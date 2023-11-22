import {doc, setDoc} from 'firebase/firestore';
import {auth, db} from './firebaseConfig';
import { User } from 'firebase/auth';

export const addNewUser = async (user: User, isEmployee: boolean) => {

  await setDoc(doc(db, 'Usuarios', user.uid), {
    name: user.displayName,
    email: user.email,
    id: user.uid,
    isEmployee,
  });
};
