import { StatusBar, View } from 'react-native'
import React from 'react'

export default function StatusBarComp(props: { isDarkStyle: boolean; statusBarBgColor?: string }) {
  const { isDarkStyle = true, statusBarBgColor = 'transparent' } = props
  const STATUS_BAR_HEIGHT = 0
  return (
    <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: statusBarBgColor }}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={isDarkStyle ? 'dark-content' : 'light-content'}
      />
    </View>
  )
}
