// TopSection.tsx
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

function TopSection() {
  return (
    <View style={styles.top}>
      <MaterialIcons name="account-circle" size={50} color="#fff" />
      <Text style={styles.welcomeText}>欢迎使用我们的应用！</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
})

export default TopSection
