import React, { MutableRefObject, useCallback, useRef } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { navigationRef } from './navigation/navigation';
import { NavigationContainer } from '@react-navigation/native';
import NavigationRoot from './navigation/NavigationRoot';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): JSX.Element {
  const routeNameRef: MutableRefObject<string | undefined> = useRef();

  const styleFlex = {
    flex: 1,
    backgroundColor: '#f5fffa',
  };

  const handleStateChange = useCallback(() => {
    if (!navigationRef.current) {
      return;
    }
    const currentRouteName = navigationRef.current.getCurrentRoute()?.name;

    routeNameRef.current = currentRouteName;
  }, []);

  return (
    <GestureHandlerRootView style={styleFlex}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current =
              navigationRef?.current?.getCurrentRoute()?.name;
          }}
          onStateChange={handleStateChange}>
          <StatusBar
            barStyle="dark-content"
            translucent={true}
            hidden={false}
            backgroundColor="transparent"
          />
          <NavigationRoot />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
