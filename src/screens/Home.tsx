import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useColorScheme } from 'nativewind'
import { ScrollView } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import StatusBarComp from '@/components/StatusBarComp'
import { useDark } from '@/hooks'
import { navigate } from '@/navigation'

export default function Home() {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  return (

      <ScrollView>
        <StatusBarComp isDarkStyle={useDark().isDark} ></StatusBarComp>
        <View className="flex-1 flex-row">
          <TouchableOpacity>
            <View style={{ width: Dimensions.get('window').width / 4 }} className="h-[90] items-center justify-center bg-[#00b38a]">
              <Ionicons name="scan-outline" size={40} color={'white'}></Ionicons>
              <Text className="text-[#fff] text-[14]">扫一扫</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ width: Dimensions.get('window').width / 4 }} className="h-[90] items-center justify-center bg-[#00b38a]">
              <Ionicons name="qr-code-outline" size={40} color={'white'}></Ionicons>
              <Text className="text-[#fff] text-[14]">付款码</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigate('Todo') }}>
            <View style={{ width: Dimensions.get('window').width / 4 }} className="h-[90] items-center justify-center bg-[#00b38a]">
              <Ionicons name="trail-sign-outline" size={40} color={'white'}></Ionicons>
              <Text className="text-[#fff] text-[14]">出行</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ width: Dimensions.get('window').width / 4 }} className="h-[90] items-center justify-center bg-[#00b38a]">
              <Ionicons name="card-outline" size={40} color={'white'}></Ionicons>
              <Text className="text-[#fff] text-[14]">卡包</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
  )
}
