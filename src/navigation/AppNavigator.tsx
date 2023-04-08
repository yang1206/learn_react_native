import { useColorScheme } from 'nativewind'
import type { StackScreenProps } from '@react-navigation/stack'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import { TabNavigator } from './tab-navigator'
import { navigationRef } from './helpers/navigationUtilities'
import { AboutScreen, CameraScreen, TodoScreen } from '@/screens'

export interface AppStackParamList {
  Tab: undefined
  Camera: undefined
  Todo: undefined
  About: undefined
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = function AppStack() {
  const { colorScheme } = useColorScheme()

  const isDark = colorScheme === 'dark'

  return (
    <Stack.Navigator
      screenOptions={{
        headerBlurEffect: isDark ? 'systemMaterialDark' : 'systemMaterialLight',
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen options={{
        headerShown: false,
      }} name="Camera" component={CameraScreen} />
      <Stack.Screen options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#00b38a',
        },
      }} name="Todo" component={TodoScreen} />
      <Stack.Screen options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#00b38a',
        },
      }} name="About" component={AboutScreen} />
    </Stack.Navigator>
  )
}

export interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export const AppNavigator = function AppNavigator(props: NavigationProps) {
  const { colorScheme } = useColorScheme()

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer {...props}
        ref={navigationRef}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <AppStack />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
