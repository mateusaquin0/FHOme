import {sendEmailVerification} from 'firebase/auth';
import {auth} from './firebaseConfig';

export const sendVerificationEmail = () => {
  sendEmailVerification(auth.currentUser!).then(() => {
    // Email verification sent!
    // ...
  });
};
