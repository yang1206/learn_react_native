import * as React from 'react'
import * as storage from './utils/storage'
import { AppNavigator, NAVIGATION_PERSISTENCE_KEY, useNavigationPersistence } from './navigation'

const App = () => {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  return (
      <AppNavigator
        {...(__DEV__
          ? {
              initialState: initialNavigationState,
              onStateChange: onNavigationStateChange,
            }
          : {})}
      />
  )
}

export default App
