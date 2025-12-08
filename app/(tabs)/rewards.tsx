
// import data from '@/assets/data/rewardCategories.json';

import { Icons } from '@/constants/Icons';
import { Images } from '@/constants/images';
import { Ionicons } from '@expo/vector-icons';
// import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { goBack } from 'expo-router/build/global-state/routing';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const Rewards = () => {
const ITEM_HEIGHT = 216;
  const router = useRouter();

  const rewardCategories = [
    { "id": 1, "cat_id": 1, "name": "Accessories", "image": "reward1.png" },
    { "id": 2, "cat_id": 2, "name": "ShoppingLifestyle", "image": "reward2.png" },
    { "id": 3, "cat_id": 3, "name": "ECommOnline", "image": "reward3.png" },
    { "id": 4, "cat_id": 1, "name": "Entertainment", "image": "reward4.png" },
    { "id": 5, "cat_id": 3, "name": "HealthWellness", "image": "reward5.png" },
    { "id": 6, "cat_id": 2, "name": "Gifting", "image": "reward6.png" },
  ];

  const rewardhome ={
    "summary": {
        "points_earned": 1200,
        "points_redeemed": 800,
        "points_balance": 400
    }
  }

  

  return (
    <View className='flex-1 bg-white'>
      <View className='flex-row w-full bg-primary'>
        <Ionicons name="arrow-back-outline" size={30} color="white" className='m-4' onPress={() => { goBack() }} />
        <Text className='text-white text-xl  mt-5'>Bonus </Text>
      </View>

      {/* Points */}
      <View className='flex-row justify-around px-4 py-4'>
        <View className='flex-1 items-center mx-2'>
          <View className='flex-row bg-primary rounded-full px-4 py-2 items-center'>
            <Image source={Icons.point} className='w-6 h-6' />
            <Text className='text-white text-lg ml-2'>{rewardhome?.summary?.points_earned}</Text>
          </View>
          <Text className='text-gray-500 text-sm font-semibold mt-2 text-center'>Points Earned</Text>
        </View>
        <View className='flex-1 items-center mx-2'>
          <View className='flex-row bg-primary rounded-full px-4 py-2 items-center'>
            <Image source={Icons.point} className='w-6 h-6' />
            <Text className='text-white text-lg ml-2'>{rewardhome?.summary?.points_redeemed}</Text>
          </View>
          <Text className='text-gray-500 text-sm font-semibold mt-2 text-center'>Points Redeemed</Text>
        </View>
        <View className='flex-1 items-center mx-2'>
          <View className='flex-row bg-primary rounded-full px-4 py-2 items-center'>
            <Image source={Icons.ledgerpoint} className='w-6 h-6' />
            <Text className='text-white text-lg ml-2'>{rewardhome?.summary?.points_balance}</Text>
          </View>
          <Text className='text-gray-500 text-sm font-semibold mt-2 text-center'>Points Balance</Text>
        </View>
      </View>

      {/* Reward Cat */}
      <View className='flex-row flex-wrap px-6 py-2 justify-between'>

      {
        rewardCategories.map((category) => (
          <View key={category.id} style={styles.categoryCard}>
              <TouchableOpacity key={category.id} onPress={() => router.push(`/(screen)/rewards/rewardlist?category_id=${category.cat_id}`)}>
              <View style={styles.imageContainer}>
                <Image
                  source={Images[category.image.replace('.png', '') as keyof typeof Images]}
                  // source={Images[category.image as keyof typeof Images]}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
                {/* <View style={styles.textOverlay}>
                <Text style={styles.categoryText}>{category.name}</Text>
                </View> */}
              </View>
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
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',  // Clips content to rounded corners
    position: 'relative', // Parent for absolute positioning
  },
  // The actual image
  categoryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  // Text overlay at bottom
  textOverlay: {
    position: 'absolute', // Positions over the image
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent dark background
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  // The category name text
  categoryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Text shadow for readability
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
})

export default Rewards