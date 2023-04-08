import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  useWorkletCallback,
} from 'react-native-reanimated'
import type {
  CameraPermissionRequestResult,
  CameraProps,
  CameraRuntimeError,
  FrameProcessorPerformanceSuggestion,
  PhotoFile,
} from 'react-native-vision-camera'
import {
  Camera as CameraVision,
  useCameraDevices,
} from 'react-native-vision-camera'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import type {
  HandlerStateChangeEvent,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler'
import {
  RectButton,
  TapGestureHandler,
} from 'react-native-gesture-handler'
import PhotoPreview from './PhotoPreview'

import ImageViewer from './ImageViewer'
import CircleFocus from './CircleFocus'
import { useDark } from '@/hooks'
import { hapticFeedback } from '@/utils/hapticFeedback'
import { goBack } from '@/navigation'

const ReanimatedCamera = Animated.createAnimatedComponent(CameraVision)

Animated.addWhitelistedNativeProps({
  zoom: true,
})
const MAX_FRAME_PROCESSOR_FPS = 3
function Camera() {
  const camera = useRef<CameraVision>(null)
  const isHolding = useSharedValue(false)
  const isPageActive = useSharedValue(true)
  const [frameProcessorFps, setFrameProcessorFps] = useState(3)
  const [torchActive, setTorchActive] = useState(false)
  const [frontCamera, setFrontCamera] = useState(false)
  const [permissionResult, setPermissionResult]
    = useState<CameraPermissionRequestResult>('denied')
  const [photos, setPhotos] = useState<PhotoFile[]>([])
  const [showImageViewer, setShowImageViewer] = useState(false)
  const [focusCoords, setFocusCoords] = useState({ x: 0, y: 0 })
  /* Here we use hook provided by library to take available devices (lenses) */
  const availableDevices = useCameraDevices()

  /* useCameraDevices hook returns an object with front/back properties,
     that you can use to switch between back and front camera */
  const currentDevice
    = (frontCamera && availableDevices?.front)
      ? availableDevices.front
      : availableDevices?.back
  const zoom = useSharedValue(0)

  const takePhoto = async () => {
    try {
      const result = await camera.current?.takePhoto()

      if (result)
        setPhotos(prevPhotos => [...prevPhotos, result])
    }
    catch (e) {
      Alert.alert(`Error: ${e}`)
    }
  }

  const flipCamera = () => setFrontCamera(prevState => !prevState)
  const toggleTorch = () => setTorchActive(prevState => !prevState)
  const handleOpenImageViewer = () => {
    if (photos.length > 0)
      setShowImageViewer(true)
  }
  const { isDark } = useDark()
  useEffect(() => {
    async function getPermission() {
      try {
        const cameraPermission = await CameraVision.requestCameraPermission()

        setPermissionResult(cameraPermission)
      }
      catch (error) {
        Alert.alert(
          '相机',
          '无法从相机中获取权限。',
        )
      }
    }

    getPermission()
  }, [])

  const onTapBegin = useWorkletCallback(() => {
    isHolding.value = true
    runOnJS(hapticFeedback)('selection')
  }, [isHolding])
  const onTapEnd = useWorkletCallback(() => {
    isHolding.value = false
  }, [isHolding])
  const onCameraError = useCallback((error: CameraRuntimeError) => {
    /* eslint-disable-next-line   no-console */
    console.log(`${error.code}: ${error.message}`, error.cause)
  }, [])
  const onCameraInitialized = useCallback(() => {
    /* eslint-disable-next-line   no-console */
    console.log('Camera initialized!')
  }, [])

  const onFrameProcessorPerformanceSuggestionAvailable = useCallback(
    ({ suggestedFrameProcessorFps }: FrameProcessorPerformanceSuggestion) => {
      const newFps = Math.min(
        suggestedFrameProcessorFps,
        MAX_FRAME_PROCESSOR_FPS,
      )
      setFrameProcessorFps(newFps)
    },
    [],
  )

  const animatedProps = useAnimatedProps<Partial<CameraProps>>(
    () => ({ zoom: zoom.value, isActive: !isHolding.value && isPageActive.value }),
    [zoom, isPageActive, isHolding, isPageActive],
  )

  const gestureTapToFocus = async (
    event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>,
  ) => {
    setFocusCoords({
      x: event.nativeEvent.x,
      y: event.nativeEvent.y,
    })

    await camera.current?.focus({
      x: Math.floor(event.nativeEvent.x),
      y: Math.floor(event.nativeEvent.y),
    })
  }

  /* There is an additional check to prevent errors.
     Camera component needs a valid device prop,
     we need to stop rendering if the device is falsy value. */
  if (!currentDevice)
    return <View style={styles.blackscreen} />

  if (permissionResult === 'denied')
    return null
  /* eslint-disable-next-line   no-console */
  console.log(`Camera Device: ${currentDevice.name}`)
  return (
    <View style={styles.Container}>
      <Animated.View style={{ flex: 1 }}>
        <TapGestureHandler onBegan={onTapBegin}
          onEnded={onTapEnd}
          onFailed={onTapEnd}
          enabled={true}
          minPointers={1}
          maxDurationMs={999999}
        // onHandlerStateChange={gestureTapToFocus}
        >

          {/* <AnimatedStatusBar
            barStyle="light-content"
            animated={true}
            isHidden={isHolding}
          /> */}
          <ReanimatedCamera
            ref={camera}
            style={StyleSheet.absoluteFill}
            onError={onCameraError}
            device={currentDevice}
            isActive={true}
            photo={true}
            video={true}
            torch={torchActive ? 'on' : 'off'}
            enableZoomGesture={false}
            orientation="portrait"
            animatedProps={animatedProps}
            onInitialized={onCameraInitialized}
            frameProcessorFps={frameProcessorFps}
            onFrameProcessorPerformanceSuggestionAvailable={
              onFrameProcessorPerformanceSuggestionAvailable
            }
          />

        </TapGestureHandler>
      </Animated.View>
      <View style={styles.Buttons}>
        <RectButton style={styles.Button} onPress={handleOpenImageViewer}>
          {photos.length > 0
            ? (
              <View style={styles.Photo}>
                <PhotoPreview
                  photo={`file://${photos[photos.length - 1].path}`}
                />
              </View>
              )
            : (
              <MaterialIcons name="image-not-supported" size={24} color={isDark ? 'white' : 'black'} />
              )}
        </RectButton>
        <RectButton style={styles.Button} onPress={takePhoto}>
          <MaterialIcons name="camera-alt" size={24} color={isDark ? 'white' : 'black'} />
        </RectButton>
        <RectButton style={styles.Button} onPress={flipCamera}>
          {frontCamera
            ? (
              <MaterialIcons name="camera-rear" size={24} color={isDark ? 'white' : 'black'} />
              )
            : (
              <MaterialIcons name="camera-front" size={24} color={isDark ? 'white' : 'black'} />
              )}
        </RectButton>
      </View>

      <View style={styles.ButtonsFloatings}>
        <RectButton style={styles.ButtonFloating} onPress={toggleTorch}>
          {torchActive
            ? (
              <MaterialIcons name="flash-on" size={24} color={isDark ? 'white' : 'black'} />
              )
            : (
              <MaterialIcons name="flash-off" size={24} color={isDark ? 'white' : 'black'} />
              )}
        </RectButton>
      </View>
      <View style={styles.ButtonsLeft}>
        <RectButton style={styles.ButtonFloating} onPress={() => { goBack() }}>
          <MaterialIcons name="arrow-back" size={24} color={isDark ? 'white' : 'black'} />
        </RectButton>
      </View>
      <CircleFocus x={focusCoords.x} y={focusCoords.y} />

      <ImageViewer
        images={photos.map(p => ({ uri: `file://${p.path}` }))}
        isVisible={showImageViewer}
        handleClose={() => setShowImageViewer(false)}
        imageIndex={photos.length - 1}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    right: 0,
    left: 0,
    bottom: 0,
    padding: 24,
    background: 'black',

  },
  blackscreen: {
    flex: 1,
    backgroundColor: 'black',
  },
  Button: {
    width: 30,
    height: 30,
    borderRadius: 5,
    background: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  WrapperImage: {
    width: 6,
    height: 6,
    borderRadius: 5,
    overflow: 'hidden',
  },
  Photo: {
    height: 100,
    width: 100,
  },
  ButtonsFloatings: {
    position: 'absolute',
    right: 3,
  },
  ButtonsLeft: {
    position: 'absolute',
    left: 8,
  },
  ButtonFloating: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Camera
