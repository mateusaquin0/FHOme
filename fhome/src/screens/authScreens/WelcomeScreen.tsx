import {Button, Text} from '@rneui/themed';
import {StyleSheet, View} from 'react-native';
import {colors, styledComponents} from '../../global/styles';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../services/firebaseConfig';

export function WelcomeScreen() {
  const {navigate, reset} = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user?.displayName) {
        reset({
          index: 0,
          routes: [{name: 'ClientTabs'}],
        });
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button type="clear" loading size="lg" color={colors.buttons} />
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>RESERVE SEUS PEDIDOS</Text>
        <Text style={styles.text}>EM ALGUNS CLIQUES</Text>
      </View>

      <View style={{margin: 20, gap: 20}}>
        <Button
          title="Entrar"
          buttonStyle={styledComponents.styledButton}
          titleStyle={styledComponents.buttonTitle}
          onPress={() => navigate('SignIn')}
        />
        <Button
          title="Criar uma conta"
          buttonStyle={styledComponents.outlineStyledButton}
          titleStyle={styledComponents.outlineButtonTitle}
          onPress={() => navigate('NewAccount')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    fontSize: 20,
    color: colors.orange,
    fontWeight: 'bold',
  },

  textContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
});
