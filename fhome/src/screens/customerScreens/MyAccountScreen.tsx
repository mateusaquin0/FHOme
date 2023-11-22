import {useNavigation} from '@react-navigation/native';
import {Button, Icon, Text} from '@rneui/themed';
import {signOut} from 'firebase/auth';
import {StyleSheet, View} from 'react-native';
import {auth} from '../../services/firebaseConfig';
import {colors} from '../../global/styles';
import {useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';

export function MyAccountScreen() {
  const {reset} = useNavigation();
  const {userType} = useContext(UserContext);

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
      <View>
        <View style={styles.dataContainer}>
          <Text style={styles.title}>Seus dados</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Nome</Text>
          <Text style={styles.text}>{auth.currentUser?.displayName}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.text}>{auth.currentUser?.email}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Tipo de usuário</Text>
          <Text style={styles.text}>
            {userType === 'customer' ? 'Cliente' : 'Funcionário'}
          </Text>
        </View>
      </View>

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
    justifyContent: 'space-between',
  },

  dataContainer: {
    borderBottomWidth: 1,
    borderColor: colors.gray4,
    padding: 10,
    gap: 5,
  },

  title: {
    fontSize: 18,
    color: colors.gray1,
  },

  text: {
    fontSize: 14,
    color: colors.gray3,
  },

  label: {
    fontSize: 14,
    color: colors.gray2,
  },
});
