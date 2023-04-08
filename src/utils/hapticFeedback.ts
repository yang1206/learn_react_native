import type { HapticFeedbackTypes } from 'react-native-haptic-feedback'
import HapticFeedback from 'react-native-haptic-feedback'

export function hapticFeedback(
  type: string | HapticFeedbackTypes = 'impactLight',
) {
  HapticFeedback.trigger(type)
}
