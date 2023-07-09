/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack'

function App(): JSX.Element {
  return (
    <SafeAreaProvider style={{ width: '100%', height: '100%' }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
    </SafeAreaProvider>
  )
}

export default App
