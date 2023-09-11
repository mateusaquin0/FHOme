import { Text, TextInput, View } from "react-native";
import { useState } from "react";
import { StyledButton } from "../../shared/components/StyledButton/StyledButton";
import { router } from "expo-router";
import { styles } from "./index_styles";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  EyeIcon,
  EyeOffIcon,
  Input,
  InputField,
  InputIcon,
} from "@gluestack-ui/themed";

export default function Login() {
  const goToSignUp = () => router.push("/signUp");
  const [ra, setRa] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [showPassword, setShowPassword] = useState<boolean>();

  return (
    <SafeAreaView style={styles.mainView}>
      <Text style={styles.headerText}>FHOme</Text>

      <Input variant="underlined" size="md" style={styles.input}>
        <InputField
          placeholder="RA"
          placeholderTextColor="green"
          keyboardType="numeric"
          value={ra}
          onChangeText={(text) => setRa(text)}
        />
      </Input>

      <Input variant="underlined" size="md" style={styles.input}>
        <InputField
          placeholder="Senha"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <InputIcon
          onPress={() => setShowPassword((current) => !current)}
          as={showPassword ? EyeIcon : EyeOffIcon}
        />
      </Input>
      <View style={styles.buttonsBox}>
        <StyledButton title="Login" onPress={() => {}} />
        <StyledButton title="Criar conta" onPress={goToSignUp} />
      </View>
    </SafeAreaView>
  );
}
