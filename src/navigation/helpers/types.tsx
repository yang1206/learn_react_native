import type { RouteProp as NRouteProp } from '@react-navigation/native'

import type { StackScreenProps } from '@react-navigation/stack'
import type { AuthStackParamList } from '../auth-navigator'
import type { FeedStackParamList } from '../feed-navigator'
import type { AppStackParamList } from '../root-navigator'

export type RootStackParamList = AuthStackParamList & FeedStackParamList & AppStackParamList //  & FooStackParamList & BarStackParamList
// very important to type check useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type AppStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>
export type RouteProp<T extends keyof RootStackParamList> = NRouteProp<
  RootStackParamList,
  T
>
