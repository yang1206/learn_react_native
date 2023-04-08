import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { navigate } from './helpers/navigationUtilities'
import { HomeScreen as Home } from '@/screens'

export interface HomeStackParamList {
  Home: undefined
}

const Stack = createNativeStackNavigator<HomeStackParamList>()

export function FirstNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          // title: 'Home',
          headerStyle: {
            backgroundColor: '#00b38a',
          },
          headerTintColor: '#fff',
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => { navigate('Camera') }}>
              <Text className="mr-[10] text-[18] text-white">拍照</Text>
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen name="Home" component={Home} />
      </Stack.Group>

    </Stack.Navigator>
  )
}
