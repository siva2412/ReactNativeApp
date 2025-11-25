import { Ionicons } from '@expo/vector-icons';
import { goBack } from 'expo-router/build/global-state/routing';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Bonus = () => {

  const [activeTab, setActiveTab] = useState('Unclaimed rewards');


  return (
    <View className='flex-1 bg-white'>
      {/* header Config */}
      <View className='flex-row w-full bg-primary'>
        <Ionicons name="arrow-back-outline" size={30} color="white" className='m-4' onPress={()=>{goBack()}} />
        <Text className='text-white text-xl  mt-5'>Bonus </Text>

      </View>
      <View className='flex-row   bg-primary'>

        <TouchableOpacity className='bg-primary w-[50%] pr-4' onPress={() => setActiveTab('Unclaimed rewards')}>
          <View className=' px-6 py-3'>
            <Text className='text-white text-xl '>Unclaimed rewards</Text>
          </View>
          {
            activeTab === 'Unclaimed rewards' && (
              <View className='w-full border-b-4 border-white  '>
              </View>
            )
          }
        </TouchableOpacity>

        <TouchableOpacity className='bg-primary w-[50%] items-center' onPress={() => setActiveTab('Claimed rewards')}>
          <View className=' px-6 py-3'>
            <Text className='text-white text-xl '>Claimed rewards</Text>
          </View>

          {
            activeTab === 'Claimed rewards' && (
              <View className='w-full border-b-4 border-white  '>
              </View>
            )
          }

        </TouchableOpacity>


      </View>

      {/* Scheme */}
      <View className='flex-1 justify-center items-center'>
        <Text className='bg-black/20 px-20 py-16 rounded-2xl text-center text-primary text-xl font-bold'>
          Coming Soon...
        </Text>
      </View>

    </View>
  )
}

export default Bonus