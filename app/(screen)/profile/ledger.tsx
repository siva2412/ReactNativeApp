import Dropdown from '@/components/Dropdown/Dropdown'
import { Icons } from '@/constants/Icons'
import { Ionicons } from '@expo/vector-icons'
import { goBack } from 'expo-router/build/global-state/routing'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'

const Ledger = () => {

  const data = {
    "summary": {
      "earned": 2500,
      "redeemed": 500,
      "balance": 2000
    },
    "filters": {
      "order_from": "April 2020",
      "points_type": "All Points"
    },
    "ledger_list": [
      {
        "id": 1,
        "title": "Points add in walletz",
        "date": "April 4, 2022",
        "type": "earned",
        "icon": "down",
        "points": 1000
      },
      {
        "id": 2,
        "title": "Content & LearningTask",
        "date": "April 4, 2022",
        "type": "earned",
        "icon": "down",
        "points": 1000
      },
      {
        "id": 3,
        "title": "100rs Cashback redeemed",
        "date": "April 4, 2022",
        "type": "redeemed",
        "icon": "up",
        "points": 800
      },
      {
        "id": 4,
        "title": "Image Task",
        "date": "April 4, 2022",
        "type": "earned",
        "icon": "down",
        "points": 1000
      },
      {
        "id": 5,
        "title": "100rs Cashback redeemed",
        "date": "April 4, 2022",
        "type": "redeemed",
        "icon": "up",
        "points": 800
      },
      {
        "id": 6,
        "title": "Achieving the target for Budweiser",
        "date": "April 4, 2022",
        "type": "earned",
        "icon": "down",
        "points": 1000
      },{
        "id": 7,
        "title": "100rs Cashback redeemed",
        "date": "April 4, 2022",
        "type": "redeemed",
        "icon": "up",
        "points": 800
      },
      {
        "id": 8,
        "title": "Image Task",
        "date": "April 4, 2022",
        "type": "earned",
        "icon": "down",
        "points": 1000
      },
      {
        "id": 9,
        "title": "100rs Cashback redeemed",
        "date": "April 4, 2022",
        "type": "redeemed",
        "icon": "up",
        "points": 800
      },
      {
        "id": 10,
        "title": "Achieving the target for Budweiser",
        "date": "April 4, 2022",
        "type": "earned",
        "icon": "down",
        "points": 1000
      },
      {
        "id": 11,
        "title": "100rs Cashback redeemed",
        "date": "April 4, 2022",
        "type": "redeemed",
        "icon": "up",
        "points": 800
      },
      {
        "id": 12,
        "title": "Achieving the target for Budweiser",
        "date": "April 4, 2022",
        "type": "earned",
        "icon": "down",
        "points": 1000
      }
    ]
  }

  return (
    <View className='flex-1 bg-white'>
      {/* Header */}
      <View className='flex-row w-full bg-primary'>
        <Ionicons name="arrow-back-outline" size={30} color="white" className='m-4' onPress={() => { goBack() }} />
        <Text className='text-white text-xl  mt-5'>Ledger</Text>

      </View>

      {/* Total points */}
      <View className='bg-primary py-6 flex-row justify-evenly'>
        <View className='items-center mt-2 mb-6 flex-col border-r-2 border-r-white/30 pr-4'>
          <View className='flex-row items-center mb-2'>
            <Image source={Icons.point} className='w-10 h-8 mr-2' />
            <Text className='text-3xl font-bold text-white '>{data?.summary.earned}</Text>
          </View>
          <Text className="text-white text-2xl ">Earned</Text>
        </View>
        <View className='items-center mt-2 mb-6 flex-col border-r-2 border-r-white/30 pr-4'>
          <View className='flex-row items-center mb-2'>
            <Image source={Icons.point} className='w-10 h-8 mr-2' />
            <Text className='text-3xl font-bold text-white '>{data?.summary.redeemed}</Text>
          </View>
          <Text className="text-white text-2xl ">Redeemed</Text>
        </View>
        <View className='items-center mt-2 mb-6 flex-col'>
          <View className='flex-row items-center mb-2'>
            <Image source={Icons.point} className='w-10 h-8 mr-2' />
            <Text className='text-3xl font-bold text-white '>{data?.summary.balance}</Text>
          </View>
          <Text className="text-white text-2xl ">Balance</Text>
        </View>
      </View>


      {/* Filter Tabs */}
      <View className=' px-4 py-2 flex-row justify-between '>

        <Dropdown
          options={["April 2020", "May 2020", "June 2020"]}
          label="Order From"
          onChange={() => ""}
          value={"April 2020"}
          placeholder=''
        />
        <Dropdown
          options={["All Points", "Earned", "Redeemed"]}
          label="Points Type"
          onChange={() => ""}
          value={"All Points"}
          placeholder=''
        />
      </View>

      {/* Ledger List */}
      <ScrollView className='px-4 py-2 flex-1'>


        {data.ledger_list.map((item) => (

          <View key={item.id} className='px-4 py-2 h-20 flex-row justify-between border-b border-gray-300 pb-2 mb-4'>

            <View className='w-[10%] justify-center items-start mr-2'>
              <Image source={item.type == "earned" ? Icons.credit : Icons.debit} className='w-12 h-12 resize-contain ' />
            </View>
            <View className='w-[70%] justify-center items-start px-2 mr-2' >
              <Text className='text-lg font-semibold'>
                {item.title}
              </Text>
              <Text className='text-base text-gray-600'>
                {item.date}
              </Text>
            </View>
            <View className='w-[20%] justify-end items-center flex-row py-3 mb-3'>
              <Image source={Icons.ledgerpoint} className='w-6 h-6 ' resizeMode='contain' />
              <Text className={`text-1xl px-2 font-semibold py-1 ${item.type === "earned" ? "text-green-600" : "text-red-600"}`}>{item.points}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

    </View>
  )
}

export default Ledger