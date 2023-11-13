import {StyleSheet, View, TextInput} from 'react-native';
import {Header} from '../../components/Header';
import {Button, Icon, Text} from '@rneui/themed';
import {colors, styledComponents} from '../../global/styles';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import {sendVerificationEmail} from '../../services/sendVerificationEmail';
import {updateUserProfile} from '../../services/updateProfile';
import {auth} from '../../services/firebaseConfig';

enum EnumPasswordError {
  MinLength = 'Senha deve ter mais de 6 caracteres',
  NotCorresponding = 'Senhas não correspondem',
}

enum EnumFireBaseError {
  InvalidEmail = 'E-mail inválido',
  EmailInUse = 'E-mail já está em uso',
}

export function NewAccountScreen() {
  const [seePassword, setSeePassword] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [fieldsError, setFieldsError] = useState(false);
  const [passwordError, setPasswordError] = useState<
    boolean | EnumPasswordError
  >();
  const [firebaseError, setFirebaseError] = useState<
    boolean | EnumFireBaseError
  >();

  const {goBack, reset} = useNavigation();

  const newUserFirebase = async () => {
    const hasFieldErrors = verifyFields();
    const hasPasswordError = verifyPassword();

    if (!hasFieldErrors && !hasPasswordError) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          updateUserProfile({name: nome}).then(() => {
            sendVerificationEmail();
            reset({
              index: 0,
              routes: [{name: 'Welcome'}],
            });
          });
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          verifyFirebaseError(errorCode);
          setIsLoading(false);
        });
      setIsLoading(true);
    }
  };

  const verifyFields = () => {
    const hasErrors = !nome || !email || !password || !passwordConfirm;
    setFieldsError(() => {
      return hasErrors;
    });
    return hasErrors;
  };

  const verifyPassword = () => {
    setPasswordError(() => {
      if (password !== passwordConfirm) {
        return EnumPasswordError.NotCorresponding;
      } else if (password.length < 6) return EnumPasswordError.MinLength;
      else return false;
    });
    return password !== passwordConfirm || password.length < 6;
  };

  const verifyFirebaseError = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        setFirebaseError(EnumFireBaseError.EmailInUse);
        break;
      case 'auth/invalid-email':
        setFirebaseError(EnumFireBaseError.InvalidEmail);
        break;
    }
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
        <Text style={{...styles.description, marginBottom: 20}}>
          Cadastre-se agora!
        </Text>
        <Text style={styles.description}>Obtenha o poder de escolher</Text>
        <Text style={styles.description}>tudo que quiser sem filas</Text>
      </View>

      <View style={styles.inputContainer}>
        <View>
          <TextInput
            style={styles.emailInput}
            placeholder="Nome"
            value={nome}
            onChangeText={text => setNome(text)}
          />
        </View>
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
        <View style={styles.passwordSection}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirmar senha"
            secureTextEntry={!seePassword}
            value={passwordConfirm}
            onChangeText={text => setPasswordConfirm(text)}
          />
          <Icon
            type="material-community"
            name={seePassword ? eyes.open : eyes.closed}
            color={colors.gray3}
            onPress={() => setSeePassword(previous => !previous)}
          />
        </View>
      </View>

      {fieldsError && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Icon
            type="material-community"
            name="alert"
            color={colors.gray3}
            size={18}
          />
          <Text style={styles.description}>Preencha todos os campos</Text>
        </View>
      )}

      {!fieldsError && !!passwordError && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Icon
            type="material-community"
            name="alert"
            color={colors.gray3}
            size={18}
          />
          <Text style={styles.description}>{passwordError}</Text>
        </View>
      )}

      {!!firebaseError && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Icon
            type="material-community"
            name="alert"
            color={colors.gray3}
            size={18}
          />
          <Text style={styles.description}>{firebaseError}</Text>
        </View>
      )}

      <View style={{marginHorizontal: 20, marginVertical: 20}}>
        <Button
          title="Criar conta"
          buttonStyle={styledComponents.styledButton}
          titleStyle={styledComponents.buttonTitle}
          onPress={newUserFirebase}
          loading={isLoading}
        />
      </View>
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
