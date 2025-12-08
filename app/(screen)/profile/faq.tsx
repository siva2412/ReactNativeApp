import { Ionicons } from '@expo/vector-icons'
import { goBack } from 'expo-router/build/global-state/routing'
import React, { useState } from 'react'
import { LayoutAnimation, Text, TouchableOpacity, View } from 'react-native'

const FAQ = () => {

  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  const faqData = [
    {
      question: "How do I see my winning points?",
      answer: "You can view your winning points from the Dashboard under 'My Points' section."
    },
    {
      question: "How do I redeem my reward points?",
      answer: "Go to Rewards > Redeem and choose the item or voucher you want."
    },
    {
      question: "How do I check the Leaderboard?",
      answer: "Open the Leaderboard tab from the bottom navigation."
    },
    {
      question: "How do I update my profile details?",
      answer: "Navigate to Profile > Edit Profile to update your details."
    },
    {
      question: "How do I contact customer support?",
      answer: "Go to Profile > Customer Support to reach out to our team."
    },
    {
      question: "How do I track my rewards?",
      answer: "Visit the Rewards section and select 'Track Rewards' to see your progress."
    },
    {
      question: "How do I view my ledger?",
      answer: "Access the Ledger from your Profile to see all your transactions."
    }
  ];

  const toggle = (index: number) => {
    LayoutAnimation.easeInEaseOut();
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  return (
    <View className='flex-1'>
      {/* Header */}
      <View className='flex-row w-full bg-primary'>
        <Ionicons name="arrow-back-outline" size={30} color="white" className='m-4' onPress={() => { goBack() }} />
        <Text className='text-white text-xl  mt-5'>FAQ</Text>
      </View>

      <View className='px-4 py-10'>
        <Text className='px-4 text-start text-4xl font-semibold mt-4 text-primary'>FAQ´S</Text>

        <Text className='text-base text-textSecondary   px-4 mt-2'>
          Lorem ipsum is a placeholder text commonly used to demonstrate the v
        </Text>
        {/* FAQ Content */}
        <View className='p-4'>
          {faqData.map((item: any, index: any) => (
            <>
              <View key={index + 'question'} className=' flex-row justify-between items-center border-b border-gray-300 mb-2 mt-2 pb-2 pt-2'>
                <TouchableOpacity
                  // onPress={() => setSelectedQuestion(selectedQuestion === index ? null : index)}
                  onPress={() => toggle(index)}
                  className='flex-row justify-between items-center w-full'
                >
                <Text className='text-lg font-bold'>{item.question}</Text>
                  <Ionicons name={selectedQuestion === index ? "chevron-up-outline" : "chevron-down-outline"} size={24} color="black" />
                </TouchableOpacity>

              </View>
              <View className='mb-4 pl-8' key={index + 'answer'}>
                {
                  selectedQuestion === index && (
                    <Text className='text-base text-gray-800 mt-2' onPress={() => setSelectedQuestion(null)}>{item.answer}</Text>
                  )
                }
              </View>
            </>
          ))}
        </View>
      </View>
    </View>
  )
}

export default FAQ