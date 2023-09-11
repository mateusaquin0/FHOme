import { View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  ButtonText,
  EyeIcon,
  EyeOffIcon,
  Input,
  InputField,
  InputIcon,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { StyledButton } from "../../shared/components/StyledButton/StyledButton";

export default function SignUp() {
  const goBack = () => router.back();

  const [showPassword, setShowPassword] = useState<boolean>();
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>();

  return (
    <SafeAreaView>
      <View style={styles.mainView}>
        <Input variant="underlined" size="md" style={styles.input}>
          <InputField placeholder="RA" keyboardType="numeric" />
        </Input>

        <Input variant="underlined" size="md" style={styles.input}>
          <InputField placeholder="Nome" />
        </Input>

        <Input variant="underlined" size="md" style={styles.input}>
          <InputField placeholder="Celular" keyboardType="phone-pad" />
        </Input>

        <Input
          variant="underlined"
          size="md"
          style={styles.input}
          alignItems="center"
        >
          <InputField placeholder="Senha" secureTextEntry={!showPassword} />
          <InputIcon
            onPress={() => setShowPassword((current) => !current)}
            as={showPassword ? EyeIcon : EyeOffIcon}
          />
        </Input>

        <Input
          variant="underlined"
          size="md"
          style={styles.input}
          alignItems="center"
        >
          <InputField
            placeholder="Confirme sua senha"
            secureTextEntry={!showConfirmPassword}
            keyboardType="twitter"
          />
          <InputIcon
            onPress={() => setShowConfirmPassword((current) => !current)}
            as={showConfirmPassword ? EyeIcon : EyeOffIcon}
          />
        </Input>

        <StyledButton title="Criar conta" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 16,
  },

  input: {
    width: "100%",
    maxWidth: 300,
  },
});
