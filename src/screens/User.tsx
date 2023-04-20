import React from 'react'
import { Alert, StyleSheet } from 'react-native'
import { SafeAreaScrollView } from '@/components/SafeAreaScrollView'
import { Image, Text, TouchableOpacity, View } from '@/ui'

const User: React.FC = () => {
  return (
    <SafeAreaScrollView contentContainerStyle={styles.container}>
      <View className="flex-row justify-center" style={styles.avatar}>
        <Image className="w-[80] h-[80] my-[10] rounded-full" source={{ uri: 'https://s2.loli.net/2022/05/12/gxRJwmb1ClQPoGe.jpg' }}></Image>
      </View>
      <TouchableOpacity onPress={() => { Alert.alert('aaa') }}>
        <View>
          <Text>关于</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  avatar: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

})

export default User
