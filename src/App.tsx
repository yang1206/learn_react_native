import * as React from 'react'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import * as storage from './utils/storage'
import { AppNavigator, NAVIGATION_PERSISTENCE_KEY, useNavigationPersistence } from './navigation'

const App = () => {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics} >
      <AppNavigator
        {...(__DEV__
          ? {
              initialState: initialNavigationState,
              onStateChange: onNavigationStateChange,
            }
          : {})}
      />
    </SafeAreaProvider>
  )
}

export default App
