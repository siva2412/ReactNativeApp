import { Ionicons } from '@expo/vector-icons'
import { goBack } from 'expo-router/build/global-state/routing'
import React from 'react'
import { Text, View } from 'react-native'

const Customerservices = () => {
  return (
    <View className='flex-1 bg-white'>
      {/* Header */}
      <View className='flex-row w-full bg-primary'>
        <Ionicons name="arrow-back-outline" size={30} color="white" className='m-4' onPress={() => { goBack() }} />
        <Text className='text-white text-xl  mt-5'>Customer Services</Text>
      </View>

      <View className='flex-1 pl-6 pr-2 py-8'>
        <Text className='text-lg font-semibold'>How can we help?</Text>
        <Text className='text-base'>Find Answers to all your queries in the FAQ section.</Text>

        <Text
          className='text-base mt-10'
        >Still looking for help? Get in touch with an AB InBev
          Representative today!-
        </Text>

        <Text className='text-xl mt-10 font-semibold text-primary'>
          Give A Call On
        </Text>

        <View className='flex-row items-center justify-center bg-[#709E32] px-4 py-4 rounded-5xl mt-5'>
          <Ionicons name="call-outline" size={26} color="white" className='' />
          <Text className='text-2xl items-center font-semibold ml-4 text-white '>
            08040554852
          </Text>
        </View>

        <Text className='text-xl mt-10 font-semibold text-primary'>
          You can also write to us on
        </Text>
        <Text className='text-base'>
          xxxxxxxxx@yyyyyyy.in
        </Text>
        <Text
          className='text-base mt-10'
        >
          Contact us from 10:30 AM to 5:30 PM from Monday to
          Sunday (except Government Holidays)
        </Text>

      </View>
    </View>
  )
}

export default Customerservices