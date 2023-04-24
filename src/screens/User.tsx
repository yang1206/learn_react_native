import React, { useCallback } from 'react'
import { Alert, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaScrollView } from '@/ui/core/safearea-scrollview'
import { Image, Text, TouchableOpacity, View } from '@/ui'
import { navigate } from '@/navigation'
import { useAuthStore } from '@/store'
import { t, useSelectedLanguage } from '@/locales'

const User: React.FC = () => {
  const { logout } = useAuthStore()

  const { language, setLanguage } = useSelectedLanguage()

  const changeLanguage = useCallback(() => {
    language === 'zh' ? setLanguage('en') : setLanguage('zh')
    // forceUpdate()
  }, [setLanguage])
  return (
    <SafeAreaScrollView contentContainerStyle={styles.container}>
      <View className="flex-row justify-center" style={styles.line}>
        <Image className="w-[80] h-[80] my-[10] rounded-full" source={{ uri: 'https://s2.loli.net/2022/05/12/gxRJwmb1ClQPoGe.jpg' }}></Image>
      </View>
      <TouchableOpacity onPress={() => { navigate('About') }}>
        <View className="flex-row justify-between px-[20] items-center  py-[10]" style={styles.line}>
          <View className="flex-row items-center gap-1">
            <Ionicons name={'information-circle-outline'} size={20} color={'#2d3'}></Ionicons>
            <Text className="text-[18px]">{t('UserScreen.about')}</Text>
          </View>
          <Ionicons name={'chevron-forward-outline'} size={20} color={'#bbb'}></Ionicons>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={changeLanguage}>
        <View className="flex-row justify-between px-[20] items-center  py-[10]" style={styles.line}>
          <View className="flex-row items-center gap-1">
            <Ionicons name={'language-outline'} size={20} color={'#22d'}></Ionicons>
            <Text className="text-[18px]">{t('UserScreen.language')}</Text>
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
              text: t('common.cancel'),
              onPress: () => Alert.alert('Cancel Pressed'),
              style: 'cancel',
            },
            { text: t('common.confirm'), onPress: () => logout() },
          ],
        )
      }}>
        <View className="flex-row justify-between px-[20] items-center  py-[10]" style={styles.line}>
          <View className="flex-row items-center gap-1">
            <Ionicons name={'log-out-outline'} size={20} color={'#22d'}></Ionicons>
            <Text className="text-[18px]">{t('UserScreen.logout')}</Text>
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
