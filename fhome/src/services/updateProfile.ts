import {updateProfile} from 'firebase/auth';
import {auth} from './firebaseConfig';

interface userProfile {
  name: string;
}

export const updateUserProfile = async ({name}: userProfile) => {
  const user = auth.currentUser;

  await updateProfile(user!, {
    displayName: name,
  })
    .then(async () => {
      await user?.reload().then();
    })
    .catch(error => {});
};
