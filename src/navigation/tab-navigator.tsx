import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import type { RouteProp } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { ComponentType } from 'react'
import * as React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import type { IconProps } from 'react-native-vector-icons/Icon'
import { FirstNavigator } from './first-navigator'
import { NewsScreen, UserScreen } from '@/screens'
import { colors } from '@/ui'

export type TabParamList = {
  First: undefined
  News: undefined
  User: undefined
}

interface TabType {
  name: keyof TabParamList
  component: ComponentType<any>
  label: string
}
type TabIconsType = {
  [key in keyof TabParamList]: (props: Partial<IconProps>) => JSX.Element;
}
const Tab = createBottomTabNavigator<TabParamList>()

const tabsIcons: TabIconsType = {
  First: props => <Ionicons
    name="home-outline"
    {...props}
  />,
  News: props => <Ionicons
    name="newspaper-outline"
    {...props}
  />,
  User: props => <Ionicons
    name="person"
    {...props}
  />,
}

export interface TabList<T extends keyof TabParamList> {
  navigation: NativeStackNavigationProp<TabParamList, T>
  route: RouteProp<TabParamList, T>
}

const tabs: TabType[] = [
  {
    name: 'First',
    component: FirstNavigator,
    label: 'Home',
  },
  {
    name: 'News',
    component: NewsScreen,
    label: 'News',
  },
  {
    name: 'User',
    component: UserScreen,
    label: '个人中心',
  },
]

interface BarIconType {
  name: keyof TabParamList
  color: string
  size: number
}

function BarIcon({ color, name, size, ...reset }: BarIconType) {
  const Icon = tabsIcons[name]
  return <Icon color={color} size={size} {...reset} />
}
export function TabNavigator() {
  return (
    <Tab.Navigator
      // initialRouteName="News"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => <BarIcon name={route.name} size={30} color={color} />,
        tabBarActiveTintColor: colors.primary[400],
        tabBarInactiveTintColor: colors.neutral[600],
      })}
    >
      <Tab.Group
      >
        {tabs.map(({ name, component, label }) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={component}
              options={{
                title: label,
                headerStyle: {
                  backgroundColor: '#00b38a',
                },
                headerTintColor: '#fff',
                headerShown: name !== 'First',
              }}
            />
          )
        })}
      </Tab.Group>
    </Tab.Navigator>
  )
}
