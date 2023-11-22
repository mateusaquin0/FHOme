import {StyleSheet, View, TextInput} from 'react-native';
import {Header} from '../../components/shared/Header';
import {Button, CheckBox, Icon, Text} from '@rneui/themed';
import {colors, styledComponents} from '../../global/styles';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {sendVerificationEmail} from '../../services/sendVerificationEmail';
import {updateUserProfile} from '../../services/updateProfile';
import {auth} from '../../services/firebaseConfig';
import {addNewUser} from '../../services/createNewUser';

enum EnumPasswordError {
  MinLength = 'Senha deve ter mais de 6 caracteres',
  NotCorresponding = 'Senhas não correspondem',
}

enum EnumFireBaseError {
  InvalidEmail = 'E-mail inválido',
  EmailInUse = 'E-mail já está em uso',
}

export function NewAccountScreen() {
  const [isSelected, setSelection] = useState(false);
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
            addNewUser(auth.currentUser!, isSelected);
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
          console.error(error);
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
            placeholderTextColor={colors.gray3}
            style={styles.emailInput}
            placeholder="Nome"
            value={nome}
            onChangeText={text => setNome(text)}
          />
        </View>
        <View>
          <TextInput
            placeholderTextColor={colors.gray3}
            style={styles.emailInput}
            placeholder="E-mail"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.passwordSection}>
          <TextInput
            placeholderTextColor={colors.gray3}
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
            placeholderTextColor={colors.gray3}
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
        <View>
          <CheckBox
            title="Sou um funcionário"
            checked={isSelected}
            onPress={() => setSelection(prev => !prev)}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={'checkbox-blank-outline'}
            checkedColor={colors.orange}
            containerStyle={{backgroundColor: 'transparent'}}
            textStyle={styles.description}
          />
        </View>
      </View>

      {fieldsError && (
        <View style={styles.errorContainer}>
          <Icon
            type="material-community"
            name="alert"
            color={colors.alert}
            size={18}
          />
          <Text style={styles.alert}>Preencha todos os campos</Text>
        </View>
      )}

      {!fieldsError && !!passwordError && (
        <View style={styles.errorContainer}>
          <Icon
            type="material-community"
            name="alert"
            color={colors.alert}
            size={18}
          />
          <Text style={styles.alert}>{passwordError}</Text>
        </View>
      )}

      {!!firebaseError && (
        <View style={styles.errorContainer}>
          <Icon
            type="material-community"
            name="alert"
            color={colors.alert}
            size={18}
          />
          <Text style={styles.alert}>{firebaseError}</Text>
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
    fontWeight: 'normal',
  },

  alert: {
    color: colors.alert,
  },

  emailInput: {
    color: colors.gray1,
    borderWidth: 1,
    borderColor: colors.gray3,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 10,
  },

  passwordInput: {
    color: colors.gray1,
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

  errorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 20,
  },
});
