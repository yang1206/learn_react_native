import { useColorScheme, PlatformColor } from 'react-native';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import  HomeScreen  from '@/screens/Home';

export type AppStackParamList = {
  Home: undefined;
  Settings: undefined;
  AppMask: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = (function AppStack() {
  const isDark = useColorScheme() === 'dark';

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
    </Stack.Navigator>
  );
});

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

const theme = {
  colors: {
    primary: PlatformColor('systemBlue'),
    text: PlatformColor('label'),
  },
};

export const AppNavigator = (function AppNavigator(props: NavigationProps) {
  return (
    <NavigationContainer {...props} theme={theme as unknown as Theme}>
      <AppStack />
    </NavigationContainer>
  );
});
