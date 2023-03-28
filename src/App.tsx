import * as React from 'react'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack/src'
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'
import HomeScreen from './screens/Home'
import AboutScreen from './screens/About'
import * as storage from '@/utils/storage';
import { AppNavigator, useNavigationPersistence, NAVIGATION_PERSISTENCE_KEY } from './navigation';

const App = () => {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);


  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics} >
      <AppNavigator
        {...(__DEV__
          ? {
            initialState: initialNavigationState,
            onStateChange: onNavigationStateChange,
          }
          : {})}
      />
      {/* <NavigationContainer ref={(nav) => setNavigator(nav)} theme={DefaultTheme} >
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="About" options={{ animationTypeForReplace: 'pop' }} component={AboutScreen} />
        </Stack.Navigator>
      </NavigationContainer> */}
    </SafeAreaProvider>
  )
}


export default App
