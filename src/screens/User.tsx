import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaScrollView } from '@/components/SafeAreaScrollView'

const User: React.FC = () => {
  return (
    <SafeAreaScrollView contentContainerStyle={styles.container}>
      <Text>啊是不是就好</Text>
    </SafeAreaScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

})

export default User
