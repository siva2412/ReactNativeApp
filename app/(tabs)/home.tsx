import { useRouter } from 'expo-router'
import React from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { removeData } from '../../utils/storage'

const Home = () => {
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              // Remove token from storage
              await removeData('token');
              
              // Navigate back to login
              router.replace('/(auth)/login');
            } catch (error) {
              console.error('Error during logout:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ],
    );
  };

  return (
    <View className="flex-1 justify-center items-center bg-primary px-6">
      <Text className="text-4xl font-bold text-secondary text-center mb-4">
        Welcome Home!
      </Text>
      <Text className="text-lg text-white mt-4 text-center mb-8 px-4">
        You have successfully logged in to Bud4Trade.
      </Text>
      
      <TouchableOpacity 
        className="bg-red-500 py-3 px-6 rounded-lg"
        onPress={handleLogout}
      >
        <Text className="text-white font-semibold">
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home