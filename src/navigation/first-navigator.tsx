import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { navigate } from './helpers/navigationUtilities'
import { HomeScreen as Home } from '@/screens'

export type HomeStackParamList = {
  Home: undefined
}

const Stack = createNativeStackNavigator<HomeStackParamList>()

export const FirstNavigator = () => {
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
            <TouchableOpacity onPress={() => { navigate('User') }}>
              <Text className="text-[18] text-white mr-[10]">拍照</Text>
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen name="Home" component={Home} />
      </Stack.Group>

    </Stack.Navigator>
  )
}
