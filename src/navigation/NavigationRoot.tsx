import React, { memo } from 'react';

import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { useHeaderConfig } from './headerConfig';
import { NavigationParams } from './Navigation.types';
import { Home } from '../screens/Home';
import { WebViewScreen } from '../screens/WebViewScreen';

const Stack = createNativeStackNavigator<NavigationParams>();

const defaultOptions: NativeStackNavigationOptions = {
  headerShown: false,
  orientation: 'portrait',
};

const NavigationRoot = () => {
  const headerConfig = useHeaderConfig();

  return (
    <Stack.Navigator screenOptions={defaultOptions} initialRouteName={'Home'}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={() => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={() => ({
          ...headerConfig,
        })}
      />
    </Stack.Navigator>
  );
};

export default memo(NavigationRoot);
