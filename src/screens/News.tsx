import { Text, View } from 'react-native'
import React from 'react'
import { useThreeD } from '@/api'

export default function News() {
  const data = useThreeD({ location: '-122.0849872,37.4226711' })
  return (
    <View>
      <Text>News</Text>
    </View>
  )
}
