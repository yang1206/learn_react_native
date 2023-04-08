import React, { useState } from 'react'
import type { StatusBarProps } from 'react-native'
import { StatusBar } from 'react-native'
import type Reanimated from 'react-native-reanimated'
import {
  runOnJS,
  useAnimatedReaction,
} from 'react-native-reanimated'

interface Props extends Omit<StatusBarProps, 'hidden'> {
  isHidden: Reanimated.SharedValue<boolean>
}

export function AnimatedStatusBar({
  isHidden: isHiddenAnimatedValue,
  ...props
}: Props): React.ReactElement {
  const [isHidden, setIsHidden] = useState(false)

  useAnimatedReaction(
    () => isHiddenAnimatedValue.value,
    (is) => {
      runOnJS(setIsHidden)(is)
    },
    [isHiddenAnimatedValue],
  )

  return <StatusBar {...props} hidden={isHidden} />
}
