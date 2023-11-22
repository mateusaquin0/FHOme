import {Button, Text} from '@rneui/themed';
import {Image, StyleSheet, View} from 'react-native';
import {colors, styledComponents} from '../../global/styles';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../services/firebaseConfig';
import {LoadingScreen} from '../../components/shared/LoadingScreen';

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

  if (isLoading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>O APP PERFEITO</Text>
        <Text style={styles.text}>PARA QUEM TEM</Text>
      </View>

      <View style={{flex: 1}}>
        <Image
          source={require('../../assets/images/logo_splash.png')}
          style={styles.imageContainer}
          resizeMode="contain"
        />
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },

  imageContainer: {
    width: '100%',
    height: '100%',
  },
});
