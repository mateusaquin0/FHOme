import {Button, Icon, Text} from '@rneui/themed';
import {useState} from 'react';
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, styledComponents} from '../global/styles';
import {sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '../services/firebaseConfig';

interface ForgotPasswordModalProps {
  isVisible: boolean;
  handleClose: () => void;
}

export function ForgotPasswordModal({
  isVisible,
  handleClose,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const sendEmail = () => {
    setIsloading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess(true);
        setErrorEmail(false);
        setTimeout(() => {
          handleClose();
        }, 1000);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorEmail(true);
        console.log(errorCode);
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return (
    <Modal visible={isVisible} transparent onRequestClose={handleClose}>
      <TouchableOpacity
        style={{flex: 2, backgroundColor: '#00000050'}}
        onPress={handleClose}></TouchableOpacity>
      <View style={{backgroundColor: '#00000050'}}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Redefinir senha</Text>
          <Text style={styles.text}>Qual o seu email?</Text>
          <TextInput
            style={styles.emailInput}
            placeholder="E-mail"
            value={email}
            onChangeText={text => setEmail(text)}
          />

          {errorEmail && (
            <View style={styles.alertContainer}>
              <Icon
                type="material-community"
                name="alert"
                color={colors.gray3}
                size={18}
              />
              <Text style={styles.text}>E-mail inválido</Text>
            </View>
          )}

          {success && (
            <View style={styles.alertContainer}>
              <Icon
                type="material-community"
                name="check-circle"
                color={colors.green}
                size={18}
              />
              <Text style={styles.success}>E-mail enviado</Text>
            </View>
          )}

          <Button
            title="Enviar e-mail"
            buttonStyle={styledComponents.styledButton}
            titleStyle={styledComponents.buttonTitle}
            onPress={sendEmail}
            loading={isLoading}
            disabled={success}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.cardBackground,
    gap: 20,
    padding: 20,
    borderTopWidth: 1,
    borderColor: colors.orange,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  alertContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  title: {
    fontSize: 20,
    color: colors.orange,
  },

  text: {color: colors.gray3},

  success: {
    color: colors.green,
  },

  emailInput: {
    borderWidth: 1,
    borderColor: colors.gray3,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
});
