import { Alert, Dimensions, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Geolocation from '@react-native-community/geolocation'
import { FlashList } from '@shopify/flash-list'
import { LinearGradient } from 'expo-linear-gradient'
import Swiper from './components/Swiper'
import StatusBarComp from '@/components/StatusBarComp'
import { useDark } from '@/hooks'
import { navigate } from '@/navigation'
import { SafeAreaScrollView } from '@/components/SafeAreaScrollView'
import { set } from '@/utils'
import { ues3d, uesCity, uesIndices } from '@/api'

export default function Home() {
  const [location, setLocation] = useState<string>()
  const { isDark } = useDark()
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (res) => {
        set('location', res)
        setLocation(`${res.coords.longitude},${res.coords.latitude}`)
      },
      (error) => {
        Alert.alert(JSON.stringify(error))
      },
      {
        timeout: 20000,
      },
    )
  }, [location])
  // 获取城市信息
  const { data: cityData, isLoading: cityLoading } = uesCity({
    variables: { location: location as string },
  })
  // 获取生活指数
  const { data: threeData, isLoading: threeLoading } = ues3d({
    variables: { location: location as string },
  })
  const { data: indicesData, isLoading: indicesLoading } = uesIndices({
    variables: { location: location as string, type: '1,2,5' },
  })
  if (cityLoading && threeLoading && indicesLoading)
    return <Text>正在加载</Text>

  const menuList = [{
    icon: 'scan-outline',
    title: '扫一扫',
    id: 1,
  },
  {
    icon: 'qr-code-outline',
    title: '付款码',
    id: 2,
  },
  {
    icon: 'trail-sign-outline',
    title: '出行',
    id: 3,
  },
  {
    icon: 'card-outline',
    title: '卡包',
    id: 4,
  }]
  const menuClick = (id: number) => {
    if (id === 3)
      navigate('Todo')
  }
  const IndicesItem: React.FC<{ item: any }> = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity onPress={() => { Alert.alert(item.name) }} key={item.type}>
        <View className="items-center text-center  justify-center flex  rounded-[20] bg-[#deb] h-[80]   mr-[10]" style={{ width: Dimensions.get('window').width / 3 }}>
          <Text className="text-[#222] text-[14px]">
            {item.name}
          </Text>
          <Text className="text-[#00b38a] text-[15px]">{item.category}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (

    <SafeAreaScrollView>
      <StatusBarComp isDarkStyle={isDark} ></StatusBarComp>
      <View className="flex-1 flex-row">
        {
          menuList.map((item) => {
            return (
              <TouchableOpacity key={item.icon} onPress={() => { menuClick(item.id!) }}>
                <View style={{ width: Dimensions.get('window').width / 4 }} className="h-[90] items-center justify-center bg-[#00b38a]">
                  <Ionicons name={item.icon} size={40} color={'white'}></Ionicons>
                  <Text className="text-[#fff] text-[14px]">{item.title}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>
      <Swiper />
      <View className="flex-1 flex justify-center">
        <Text className="text-[18px] ml-5">
          {cityData?.location[0].country} {cityData?.location[0].adm1} {cityData?.location[0].adm2}
        </Text>
      </View>
      <View className="flex-1 mt-2 w-full pr-10 h-[80]  flex flex-row justify-between items-center flex-wrap ml-5">
        <FlashList data={indicesData?.daily}
          nestedScrollEnabled={true}
          renderItem={({ item }) => { return <IndicesItem item={item} /> }}
          horizontal={true}
          estimatedItemSize={312}
          keyExtractor={(item: any) => item.type}
        >

        </FlashList>
      </View>
      <View className="flex flex-col justify-between items-center flex-wrap mx-[10px]">
        {
          threeData?.daily.map((item, index) => {
            return (
              <LinearGradient
                key={index}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#ddd', '#333']}
                className="items-center justify-between rounded-2xl w-full mt-[10px]"
                >
                <Text className="text-[20] text-[#eee] mt-[10]">
                  {item.fxDate}
                </Text>
                <View className="flex-row items-center mb-[10] justify-between " style={{ width: Dimensions.get('window').width - 40 }}>
                  <View className="flex-row justify-around">
                    <Text>{item.textDay} {item.tempMax}℃</Text>

                  </View>
                  <View className="flex-row justify-around" >
                    <Text>{item.tempMin}℃ {item.textNight}</Text>
                  </View>
                </View>
              </LinearGradient>
            )
          })
        }

      </View>
    </SafeAreaScrollView>
  )
}
