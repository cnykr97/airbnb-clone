import { View, Text } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser'

const Page = () => {
  useWarmUpBrowser() // browser is fine on android
  return (
    <View>
      <Text>Login</Text>
    </View>
  )
}

export default Page