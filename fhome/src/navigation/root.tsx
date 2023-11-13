import {NavigationContainer} from '@react-navigation/native';
import { AuthStack } from './auth';

export function RootNavigator() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
