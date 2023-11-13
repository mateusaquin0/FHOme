import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {WelcomeScreen} from '../screens/authScreens/WelcomeScreen';
import {SignInScreen} from '../screens/authScreens/SignInScreen';
import {NewAccountScreen} from '../screens/authScreens/NewAccountScreen';
import {ClientTabs} from './clientTabs';

const Stack = createNativeStackNavigator();

export function AuthStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewAccount"
        component={NewAccountScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ClientTabs"
        component={ClientTabs}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
