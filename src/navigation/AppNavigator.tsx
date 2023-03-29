import { PlatformColor, useColorScheme } from 'react-native'
import type { StackScreenProps } from '@react-navigation/stack'
import type { ParamListBase } from '@react-navigation/native'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/Home'
import AboutScreen from '../screens/About'
import { navigationRef } from './helpers/navigationUtilities'
export interface AppStackParamList extends ParamListBase {
  Home: undefined
  About: undefined
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = function AppStack() {
  const isDark = useColorScheme() === 'dark'

  return (
    <Stack.Navigator
      screenOptions={{
        headerBlurEffect: isDark ? 'systemMaterialDark' : 'systemMaterialLight',
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
      />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

const theme = {
  colors: {
    primary: PlatformColor('systemBlue'),
    text: PlatformColor('label'),
  },
}

export const AppNavigator = function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()
  return (
    <NavigationContainer {...props}
      ref={navigationRef}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <AppStack />
    </NavigationContainer>
  )
}
