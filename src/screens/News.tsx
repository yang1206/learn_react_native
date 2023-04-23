import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import {
  PanGestureHandler,
} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

const { width, height } = Dimensions.get('window')

const AppleMusicAnimation: React.FC = () => {
  const translateY = useSharedValue(0)

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startY: number }
  >({
    onStart: (event, context) => {
      context.startY = translateY.value
    },
    onActive: (event, context) => {
      translateY.value = context.startY + event.translationY
    },
    onEnd: () => {
      translateY.value = withSpring(0)
    },
  })

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    }
  })

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.card, animatedStyles]}>
          {/* Your Content Here */}
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width * 0.9,
    height: height * 0.7,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
})

export default AppleMusicAnimation
