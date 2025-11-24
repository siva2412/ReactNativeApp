import AlertService from '@/components/alert/AlertService';
import Checkbox from '@/components/Checkbox/checkbox';
import LoaderService from '@/components/loader/LoaderService';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const TermsAndCondition = () => {

  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  
  const handleCheckboxChange = (val: boolean) => {
   
    setIsChecked(val);
    
  };

  const onNextPress = () => {
    if (!isChecked) {
      AlertService.showAlert('You must agree to the terms and conditions to proceed.');
      return;
    }
    LoaderService.showLoader();


    setTimeout(() => {
      LoaderService.hideLoader();
      router.push('/(screen)/enrollmentscreen/enrollment');
    }, 1500);
  };

  return (
    <View className="flex-1 bg-white px-6 py-12">
      <Text className='capitalize text-3xl font-semibold'>terms and conditions</Text>
      <ScrollView>
      <Text className='mt-4 text-base text-justify text-gray-700'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </Text>
      <Text className='mt-4 text-base text-justify text-gray-700'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </Text>
      <Text className='mt-4 text-base text-justify text-gray-700'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </Text>
      </ScrollView>
      <View className="h-16 mt-5" >

        <View className='flex-row flex-nowrap gap-4'>
          {/* <Pressable className="h-8 w-8 border border-primary " >
            <Text className="text-primary text-lg font-semibold"></Text>
          </Pressable> */}
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} label="" />
          <Text className='text-base text-zinc-600 items-center pt-1 font-semibold'>
            I agree terms and conditions
          </Text>

        </View>


        <Pressable
         disabled={!isChecked}
          onPress={onNextPress}
         className ={`bg-primary rounded-5xl justify-center items-center h-14 mt-4 ${!isChecked ? 'opacity-50' : ''}`} >
          <Text className="text-white text-lg font-semibold">Next</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default TermsAndCondition
