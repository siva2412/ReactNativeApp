import { Images } from '@/constants/images'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { goBack } from 'expo-router/build/global-state/routing'
import React, { useState } from 'react'
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native'

const CashCheckout = () => {

  const [tdsModalVisible, setTdsModalVisible] = useState(false);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const router = useRouter();


  return (
    <View className='bg-white flex-1'>
      <View className='flex-row w-full bg-primary'>
        <Ionicons name="arrow-back-outline" size={30} color="white" className='m-4' onPress={() => { goBack() }} />
        <Text className='text-white text-xl  mt-5'>Proceed to checkout </Text>
      </View>

      <View className='px-6 py-5 border-x-2 border-y-2 border-rounded rounded-lg border-gray-300 m-4 '>
        <View className='flex-row justify-between border-b-2 border-gray-200 pb-4 mb-4'>
          <Text className='text-2xl font-semibold'>
            Ordered Points
          </Text>
          <Text className='text-2xl text-gray-600 pb-5'>
            500
          </Text>
        </View>
        <View className='flex-col  border-b-2 border-gray-200 pb-4 mb-4 mt-4'>
          <View className='flex-row justify-between'>

            <Text className='text-2xl font-semibold'>
              Points Value
            </Text>
            <Text className='text-2xl text-gray-600 pb-5'>
              ₹2000
            </Text>
          </View>
          <View className='flex-row justify-between'>

            <Text className='text-2xl font-semibold'>
              (-) TDS (10%)
            </Text>
            <Text className='text-2xl text-gray-600 pb-5'>
              ₹200
            </Text>
          </View>
          <View className='mb-6'>
            <TouchableOpacity onPress={() => setTdsModalVisible(true)}>
              <Text className='text-xl text-gray-600 underline'>
                Why Tds
              </Text>
            </TouchableOpacity>
          </View>


        </View>
        <View className='flex-row justify-between border-b-2 border-gray-200 pb-4 mb-4 mt-4'>
          <Text className='text-2xl font-semibold'>
            Final Payout Value
          </Text>
          <Text className='text-2xl text-gray-600 pb-5'>
            ₹1800
          </Text>
        </View>
        <View className='flex-row justify-between border-b-2 border-gray-200 pb-4 mb-4 mt-4'>
          <Text className='text-2xl font-semibold'>
            Points Balance After Redemption
          </Text>
          <Text className='text-2xl text-gray-600 pb-5'>
            1900
          </Text>
        </View>
      </View>


      <View

        className='mt-5 px-5 py-5  border-y-2 border-rounded rounded-lg border-gray-300 m-4 '>
        <View>
          <Text className='text-3xl font-semibold'>
            Payment mode (UPI)
          </Text>
          <Text className='text-xl'>
            9xxxxtest@axl
          </Text>

          <View className='flex-row justify-between mt-6 border-t-2  border-gray-300 pt-4'>
            <Text className='text-3xl font-semibold '>
              Payable in INR
            </Text>
            <Text className='text-2xl'>
              ₹1800
            </Text>

          </View>
            <Text className='border-b-2 border-gray-300 py-4'>

            </Text>
          <View className=' py-0 px-10  '>
            <TouchableOpacity
              onPress={() => { setSubmitModalVisible(true) }}
              className='mt-5 py-5 px-10 rounded-3xl '>
              <Text className='bg-primary text-white text-center text-xl font-bold mt-10 px-6 py-3 rounded-3xl'>
                Proceed to Pay
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={tdsModalVisible}
      >
        <View className='flex-1 mb-10 justify-end items-end bg-black/50'>
          <View className='bg-white p-6 rounded-3xl m-4'>
            <Text className='text-2xl font-bold mb-4'>About TDS</Text>
            <Text className='text-base mb-4'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum fugiat tempore quod nobis enim consequatur iusto, ducimus nisi deserunt tempora corporis! Quo consequuntur quia voluptatum nesciunt, vero praesentium possimus maxime illo. At qui hic eligendi magnam aut sed harum porro sint ducimus voluptatum! Modi qui libero expedita accusamus recusandae repellendus veritatis, possimus praesentium. Non iusto, optio doloremque sed culpa officia ut nobis quibusdam adipisci iste, est tempore rem voluptatibus reprehenderit impedit magni nemo. Commodi, quibusdam? Saepe, earum officia magni, quos pariatur omnis sapiente molestias sit facere corporis cupiditate cumque perspiciatis illo libero repellat ullam. Eos illo itaque aliquam vitae. Ut!
            </Text>
            <View className='items-center justify-center'>

              <TouchableOpacity
                className='bg-primary rounded-lg px-6 py-2 self-end  items-center justify-center '
                onPress={() => setTdsModalVisible(false)}
              >
                <Text className='text-white text-base'>Got it</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={submitModalVisible}
      >
        {/* <> */}

        <View className='flex-1 mb-5 justify-end items-end bg-black/50 h-[70%]'>
          <View className='bg-primary px-4 py-12 rounded-t-5xl items-center justify-center w-full relative'>

            <TouchableOpacity 
              style={{ position: 'absolute', top: 25, right: 30 }}
              onPress={() => {setSubmitModalVisible(false), router.replace('/(tabs)/home')}}
            >
              <Ionicons name="close-circle-outline" size={40} color="white" />
            </TouchableOpacity>

            <Image source={Images.ABI_Logo_FullColor} className='w-25 h-10 mt-10' resizeMode='contain' />

            <Text className='text-white text-3xl font-bold my-2 mt-10'>Success!</Text>
            <Text className='text-white text-xl mb-4 font-bold'>
              Order ID: 123456
            </Text>
            <Text className='text-white text-xl text-center'>
              Your order request is placed and will be processed within 24-48 business hours
            </Text>

            <View className='items-center justify-center mt-3'>

              <TouchableOpacity
                className='bg-primary rounded-3xl px-6 py-2 self-end  items-center justify-center border-white border-x-2 border-y-2 mt-6  '
                onPress={() => { setSubmitModalVisible(false); router.replace('/(tabs)/home') }}
              >
                <Text className='text-white text-2xl px-5 py-1 '>Got It</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* </> */}
      </Modal>

    </View>

  )
}

export default CashCheckout