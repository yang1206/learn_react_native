import React, { useState } from 'react'
import Carousel from 'react-native-reanimated-carousel'
import type { AnimatedStyleProp } from 'react-native-reanimated'
import Animated, {
  interpolate, interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import type { ViewStyle } from 'react-native'
import { Dimensions, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import PaginationItem from './PaginationItem'

const { width: PAGE_WIDTH } = Dimensions.get('window')
export type TAnimationStyle = (value: number) => AnimatedStyleProp<ViewStyle>

interface ItemProps {
  index: number
  animationValue: Animated.SharedValue<number>
  item: { id: number; image: string }
}
const CustomItem: React.FC<ItemProps> = ({ index, animationValue, item }) => {
  const maskStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ['#000000dd', 'transparent', '#000000dd'],
    )

    return {
      backgroundColor,
    }
  }, [animationValue])

  return (
    <View style={{ flex: 1 }}>
      <FastImage style={{ height: PAGE_WIDTH / 1.5, borderRadius: 0 }} source={{ uri: item.image }}></FastImage>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          maskStyle,
        ]}
      />
    </View>
  )
}

export default function Swiper() {
  const animationStyle: TAnimationStyle = React.useCallback(
    (value: number) => {
      'worklet'

      const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30])
      const translateX = interpolate(
        value,
        [-2, 0, 1],
        [-PAGE_WIDTH, 0, PAGE_WIDTH],
      )

      return {
        transform: [{ translateX }],
        zIndex,
      }
    },
    [],
  )

  const [isVertical, setIsVertical] = useState(false)
  const progressValue = useSharedValue<number>(0)
  const [pagingEnabled, setPagingEnabled] = useState<boolean>(true)
  const [snapEnabled, setSnapEnabled] = useState<boolean>(true)
  const imagesData = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=80',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=80',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=80',
    },
  ]
  const baseOptions = isVertical
    ? ({
        vertical: true,
        width: PAGE_WIDTH * 0.86,
        height: PAGE_WIDTH * 0.6,
      } as const)
    : ({
        vertical: false,
        width: PAGE_WIDTH,
        height: PAGE_WIDTH * 0.6,
      } as const)
  return (
    <>
      <Carousel
        {...baseOptions}
        loop
        autoPlay
        data={imagesData}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        pagingEnabled={pagingEnabled}
        snapEnabled={snapEnabled}
        scrollAnimationDuration={1500}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        renderItem={({ item, index, animationValue }) => (
          <CustomItem index={index} animationValue={animationValue} item={item}/>
        )}
        customAnimation={animationStyle}
      />
      {
        !!progressValue && (
          <View
          className="relative bottom-5"
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 35,
              alignSelf: 'center',
            }}>
            {imagesData.map((item, index) => {
              return (
                <PaginationItem
                  backgroundColor={'skyblue'}
                  inActiveColor={'grey'}
                  animValue={progressValue}
                  index={index}
                  key={item.id}
                  isRotate={isVertical}
                  length={imagesData.length}
                />
              )
            })}
          </View>
        )
      }
    </>
  )
}
