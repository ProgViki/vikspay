import { View, Text } from 'react-native'
import React, { useReducer } from 'react'
import { Link } from 'expo-router'

const AnimationPage = () => {

    const [isToggled, toggle] = useReducer((s: boolean) => !s, false)
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Link href="/campfire" asChild>
        <Text>Open Campfire</Text>
      </Link>
      <Link href="/campfire" asChild>
        <Text>Open Campfire</Text>
      </Link>
      <Link href="/campfire" asChild>
        <Text>Open Campfire</Text>
      </Link>
    </View>
  )
}

export default AnimationPage