import {useEffect, useState} from 'react';
import {Icon, Text} from '@rneui/themed';
import {StyleSheet, View} from 'react-native';
import {auth} from '../../services/firebaseConfig';
import {Button} from '@rneui/base';
import {colors} from '../../global/styles';
import {signOut} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {User} from '@firebase/auth';

export function HomeScreen() {
  const [user, setUser] = useState<User | null>();
  const {reset} = useNavigation();

  useEffect(() => {
    setUser(auth.currentUser);
  }, [auth.currentUser]);

  const logOut = () => {
    signOut(auth).then(() =>
      reset({
        index: 0,
        routes: [{name: 'Welcome'}],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text>Olá, {user?.displayName}!</Text>
      <View style={{marginVertical: 40}}>
        <Button
          title="Sair"
          titleStyle={{color: colors.gray2}}
          type="clear"
          icon={
            <Icon
              type="material-community"
              name="logout"
              color={colors.gray2}
            />
          }
          onPress={logOut}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
