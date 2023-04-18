import { SafeAreaView } from 'react-native-safe-area-context'
import Camera from '../components/Camera'

const Main: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <GestureHandlerRootView > */}
        <Camera />
      {/* </GestureHandlerRootView> */}
    </SafeAreaView>
  )
}

export default Main
