import { Images } from '@/constants/images'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { goBack } from 'expo-router/build/global-state/routing'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Rewardlist = () => {

  const router = useRouter();
  const { category_id } = useLocalSearchParams() //get from route params
  const [filteredRewards, setFilteredRewards] = useState([] as any[]);
  const rewardList = [
    {
      "id": 1,
      "name": "Amazon Gift Card",
      "min-points": 250,
      "max-points": 10000,
      "desc": "250 points for minimum ₹250 Amazon pay",
      "image": "giftcard1",
      "cat_id": 1
    },
    {
      "id": 2,
      "name": "Amazon Gift Card",
      "min-points": 500,
      "max-points": 10000,
      "desc": "500 points for minimum ₹500 Amazon pay",
      "image": "giftcard2",
      "cat_id": 1
    },
    {
      "id": 3,
      "name": "Amazon Gift Card",
      "min-points": 500,
      "max-points": 10000,
      "desc": "500 points for minimum ₹500 Amazon pay",
      "image": "giftcard3",
      "cat_id": 2
    },
    {
      "id": 4,
      "name": "Amazon Gift Card",
      "min-points": 500,
      "max-points": 10000,
      "desc": "500 points for minimum ₹500 Amazon pay",
      "image": "giftcard4",
      "cat_id": 2
    },
    {
      "id": 5,
      "name": "Amazon Gift Card",
      "min-points": 500,
      "max-points": 10000,
      "desc": "500 points for minimum ₹500 Amazon pay",
      "image": "giftcard5",
      "cat_id": 3
    },
    {
      "id": 6,
      "name": "Amazon Gift Card",
      "min-points": 500,
      "max-points": 10000,
      "desc": "500 points for minimum ₹500 Amazon pay",
      "image": "giftcard6",
      "cat_id": 3
    },
  ]

  useEffect(() => {

    const filtered = rewardList.filter(reward => reward.cat_id === Number(category_id));
    setFilteredRewards(filtered);

    // console.log('Filtered Rewards:', filtered);

  }, [category_id]);


  return (
    <View className='flex-1 bg-gray-100'>
      <View className='flex-row w-full bg-primary'>
        <Ionicons name="arrow-back-outline" size={30} color="white" className='m-4' onPress={() => { goBack() }} />
        <Text className='text-white text-xl  mt-5'>Gift Card</Text>
      </View>

      <View className='flex-row flex-wrap px-6 py-6 justify-between'>
        {
          filteredRewards.map((reward, index) => (
            <View key={index} className='bg-white rounded-lg px-4 py-2 mb-4' style={styles.categoryCard}>
              <TouchableOpacity
                onPress={() => {
                  // Navigate to reward detail page with reward id and name as params
                   //temporary
                   router.push({
                    pathname: '/(screen)/rewards/reward-detail',
                    params: { id: reward.id, name: reward.name }
                  });
                }}
              >
                <Text className='text-lg font-semibold '>{reward.name}</Text>
                <View
                  style={styles.imageContainer}
                  className='py-3'
                >
                  <Image
                    source={Images[reward.image as keyof typeof Images]}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                </View>
                <Text className='font-semibold text-lg'>{reward["min-points"]} - {reward["max-points"]}</Text>
                <Text className=' mb-2 text-sm text-gray-600'>{reward.desc}</Text>
              </TouchableOpacity>
            </View>
          ))
        }
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryCard: {

    width: '48%',        // 2 columns with 4% gap between
    marginBottom: 16,    // Space between rows
  },
  // Image wrapper - enables absolute positioning for text
  imageContainer: {
    width: '100%',
    height: 180,
    // borderRadius: 12,
    overflow: 'hidden',  // Clips content to rounded corners
    // position: 'relative', // Parent for absolute positioning
  },
  // The actual image
  categoryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
})

export default Rewardlist