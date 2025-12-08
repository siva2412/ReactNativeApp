import { Ionicons } from '@expo/vector-icons'
import { goBack } from 'expo-router/build/global-state/routing'
import React from 'react'
import { Text, View } from 'react-native'

const Myprofile = () => {
  return (
    <View className='flex-1'>
      {/* Header */}
      <View className='flex-row w-full bg-primary'>
        <Ionicons name="arrow-back-outline" size={30} color="white" className='m-4' onPress={() => { goBack() }} />
        <Text className='text-white text-xl  mt-5'>My Profile</Text>

      </View>
    </View>
  )
}

export default Myprofile