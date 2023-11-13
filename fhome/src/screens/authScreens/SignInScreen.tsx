import {StyleSheet, View, TextInput, Modal} from 'react-native';
import {Header} from '../../components/Header';
import {Button, Icon, Text, SocialIcon} from '@rneui/themed';
import {colors, styledComponents} from '../../global/styles';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../services/firebaseConfig';
import {ForgotPasswordModal} from '../../components/ForgotPasswordModal';

export function SignInScreen() {
  const [seePassword, setSeePassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const {navigate, goBack, reset} = useNavigation();

  const loginFirebase = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorLogin(true);
      });
  };

  return (
    <View style={styles.container}>
      <Header
        title="FHOme"
        iconType="material-community"
        iconName="arrow-left"
        onPress={goBack}
      />

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>Por favor insira e-mail e senha</Text>
        <Text style={styles.description}>registrados em sua conta</Text>
      </View>

      <View style={styles.inputContainer}>
        <View>
          <TextInput
            style={styles.emailInput}
            placeholder="E-mail"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.passwordSection}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            secureTextEntry={!seePassword}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Icon
            type="material-community"
            name={seePassword ? eyes.open : eyes.closed}
            color={colors.gray3}
            onPress={() => setSeePassword(previous => !previous)}
          />
        </View>

        {errorLogin && (
          <View style={styles.errorContainer}>
            <Icon
              type="material-community"
              name="alert"
              color={colors.gray3}
              size={18}
            />
            <Text style={styles.description}>Credenciais inválidas</Text>
          </View>
        )}
      </View>

      <View style={{marginHorizontal: 20, marginVertical: 20}}>
        <Button
          title="Entrar"
          buttonStyle={styledComponents.styledButton}
          titleStyle={styledComponents.buttonTitle}
          onPress={loginFirebase}
        />
      </View>

      <View style={{alignItems: 'center'}}>
        <Button type="clear" onPress={() => setShowModal(true)}>
          <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
        </Button>
      </View>

      {/* <View style={{alignItems: 'center', marginVertical: 20}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>OU</Text>
      </View>

      <View style={{marginHorizontal: 20}}>
        <SocialIcon
          type="google"
          title="Entrar com Google"
          button
          onPress={() => {}}
          style={styledComponents.socialIcon}
        />
      </View> */}

      <View style={{flex: 1, margin: 20, justifyContent: 'flex-end'}}>
        <View
          style={{
            alignItems: 'flex-start',
          }}>
          <Text style={styles.description}>Novo no FHOme?</Text>
        </View>

        <View style={{alignItems: 'flex-end'}}>
          <Button
            title="Criar uma conta"
            buttonStyle={{...styledComponents.outlineStyledButton, height: 40}}
            titleStyle={{...styledComponents.outlineButtonTitle, fontSize: 16}}
            onPress={() => navigate('NewAccount')}
          />
        </View>
      </View>

      {showModal && (
        <ForgotPasswordModal
          isVisible={showModal}
          handleClose={() => setShowModal(false)}
        />
      )}
    </View>
  );
}

const eyes = {
  open: 'eye-outline',
  closed: 'eye-off-outline',
};

const styles = StyleSheet.create({
  container: {flex: 1},

  descriptionContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },

  errorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  inputContainer: {
    gap: 20,
  },

  description: {
    color: colors.gray3,
  },

  emailInput: {
    borderWidth: 1,
    borderColor: colors.gray3,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 10,
  },

  passwordInput: {
    flex: 1,
  },

  passwordSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray3,
    marginHorizontal: 20,
    paddingLeft: 5,
    paddingRight: 10,
    borderRadius: 12,
  },

  forgotPassword: {
    color: colors.gray3,
    textDecorationLine: 'underline',
  },
});
