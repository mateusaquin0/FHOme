import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/customerScreens/HomeScreen';
import {MyOrdersScreen} from '../screens/customerScreens/MyOrdersScreen';
import {MyAccountScreen} from '../screens/customerScreens/MyAccountScreen';
import {Icon} from '@rneui/themed';
import {colors} from '../global/styles';

export type TabStackParamList = {
  CustomerHome: undefined;
  CustomerOrders: {newOrder: boolean};
  CustomerAccount: undefined;
};

const Tabs = createBottomTabNavigator<TabStackParamList>();

export function ClientTabs() {
  return (
    <Tabs.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: colors.buttons,
        tabBarInactiveTintColor: colors.gray2,
      })}>
      <Tabs.Screen
        name="CustomerHome"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Início',
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              type="material-community"
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CustomerOrders"
        component={MyOrdersScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Pedidos',
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              type="material-community"
              name={focused ? 'view-list' : 'view-list-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        initialParams={{newOrder: false}}
      />

      <Tabs.Screen
        name="CustomerAccount"
        component={MyAccountScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Perfil',
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              type="material-community"
              name={focused ? 'account' : 'account-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
