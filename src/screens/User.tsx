import React from 'react'
import { Alert, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaScrollView } from '@/components/SafeAreaScrollView'
import { Image, Text, TouchableOpacity, View } from '@/ui'
import { navigate } from '@/navigation'
import { useAuthStore } from '@/store'

const User: React.FC = () => {
  const { logout } = useAuthStore()

  return (
    <SafeAreaScrollView contentContainerStyle={styles.container}>
      <View className="flex-row justify-center" style={styles.line}>
        <Image className="w-[80] h-[80] my-[10] rounded-full" source={{ uri: 'https://s2.loli.net/2022/05/12/gxRJwmb1ClQPoGe.jpg' }}></Image>
      </View>
      <TouchableOpacity onPress={() => { navigate('About') }}>
        <View className="flex-row justify-between px-[20] items-center  py-[10]" style={styles.line}>
          <View className="flex-row items-center gap-1">
            <Ionicons name={'information-circle-outline'} size={20} color={'#2d3'}></Ionicons>
            <Text className="text-[18px]">关于</Text>
          </View>
          <Ionicons name={'chevron-forward-outline'} size={20} color={'#bbb'}></Ionicons>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { Alert.alert('设置') }}>
        <View className="flex-row justify-between px-[20] items-center  py-[10]" style={styles.line}>
          <View className="flex-row items-center gap-1">
            <Ionicons name={'settings-outline'} size={20} color={'#22d'}></Ionicons>
            <Text className="text-[18px]">设置</Text>
          </View>
          <Ionicons name={'chevron-forward-outline'} size={20} color={'#bbb'}></Ionicons>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        Alert.alert(
          '警告',
          '确认要退出登录吗？',
          [
            {
              text: '取消',
              onPress: () => Alert.alert('Cancel Pressed'),
              style: 'cancel',
            },
            { text: '确认', onPress: () => logout() },
          ],
        )
      }}>
        <View className="flex-row justify-between px-[20] items-center  py-[10]" style={styles.line}>
          <View className="flex-row items-center gap-1">
            <Ionicons name={'log-out-outline'} size={20} color={'#22d'}></Ionicons>
            <Text className="text-[18px]">退出</Text>
          </View>
          <Ionicons name={'chevron-forward-outline'} size={20} color={'#bbb'}></Ionicons>
        </View>
      </TouchableOpacity>
    </SafeAreaScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

})

export default User
