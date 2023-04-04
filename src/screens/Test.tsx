import React, { useEffect, useRef, useState } from 'react'
import { Animated, Button, Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaScrollView } from '@/components/SafeAreaScrollView'

export default function Test() {
  const fadeAnim = useRef(new Animated.Value(0)).current

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start()
  }

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start()
  }
  const [count, setCount] = useState(0)
  const onPress = () => setCount(count + 1)
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  useEffect(() => {
    // console.log(windowWidth, windowHeight)
  })

  return (
    <SafeAreaScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <Animated.View style={[
          styles.fadingContainer,
          {
            // Bind opacity to animated value
            opacity: fadeAnim,
          },
        ]}>
          <Text className="text-sky-500 text-[20vw]">Test</Text>
        </Animated.View>
        <View style={styles.buttonRow}>
          <Button title="Fade In View" onPress={fadeIn} />
          <Button title="Fade Out View" onPress={fadeOut} />

        </View>
        <TouchableHighlight activeOpacity={0.6} onPress={onPress}>
          <View style={styles.button}>
            <Text>Touch Here</Text>
            <Ionicons
              name="camera-reverse-outline"
              color="white"
              size={32}
            />
          </View>
        </TouchableHighlight>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count || null}</Text>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  fadingContainer: {
    padding: 20,
    paddingTop: 160,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  countText: {
    color: '#FF00FF',
  },

})
