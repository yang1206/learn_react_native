import * as React from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import type { AppStateStatus } from 'react-native'
import { Platform } from 'react-native'
import { focusManager } from '@tanstack/react-query'
import * as storage from './utils/storage'
import { NAVIGATION_PERSISTENCE_KEY, useNavigationPersistence } from './navigation'
import { useAppState, useOnlineManager } from './hooks'
import { AppNavigator } from '@/navigation/app-navigator'
import { APIProvider } from '@/api'

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web')
    focusManager.setFocused(status === 'active')
}

function App() {
  useOnlineManager()

  useAppState(onAppStateChange)
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  return (
    <BottomSheetModalProvider>
      <APIProvider>
        <AppNavigator
          {...(__DEV__
            ? {
                initialState: initialNavigationState,
                onStateChange: onNavigationStateChange,
              }
            : {})}
        />
      </APIProvider>
    </BottomSheetModalProvider>

  )
}

export default App
