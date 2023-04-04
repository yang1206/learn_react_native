import { Button, Text, View } from 'react-native'
import React from 'react'
import { useColorScheme } from 'nativewind'

export default function Home() {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  return (
    <View>
      <Text>
        <Button onPress={() => { toggleColorScheme() }} title="切换主题"></Button>
      </Text>
    </View>
  )
}
