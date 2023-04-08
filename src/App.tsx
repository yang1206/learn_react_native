import * as React from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import * as storage from './utils/storage'
import { AppNavigator, NAVIGATION_PERSISTENCE_KEY, useNavigationPersistence } from './navigation'

function App() {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  return (
    <BottomSheetModalProvider>
      <AppNavigator
        {...(__DEV__
          ? {
              initialState: initialNavigationState,
              onStateChange: onNavigationStateChange,
            }
          : {})}
      />
    </BottomSheetModalProvider>

  )
}

export default App
