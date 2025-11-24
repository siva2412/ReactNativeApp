import BrandCard from '@/components/BrandCard/BrandCard'
import { Icons } from '@/constants/Icons'
import { Images } from '@/constants/images'
import { useRouter } from 'expo-router'
import React from 'react'
import { Alert, Image, ImageBackground, ScrollView, Text, View } from 'react-native'
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
    <View className="flex-1">
      {/* Banner Config */}
      <View className='flex-1 max-h-[45%] w-full'>
        <ImageBackground source={Images.dashboardBanner} className="flex-1 pb-5">
          <View>
            <Text className='text-white'>
              Banner Section
            </Text>
          </View>
        </ImageBackground>
      </View>
      {/* Card Config */}
      <View className='absolute bottom-0 left-0 right-0 h-[60%]'>
        <ImageBackground source={Images.dashboard} className="flex-1  py-6 rounded-t-7xl overflow-hidden">
          <View className='border-t-3xl'>
            {/* Top Content */}
            <View className='px-8 py-6'>
              <Text className='text-white text-8xl font-bold'>66%</Text>
              {/* <Text className='text-white text-base mt-2'>Ready to trade some beer?</Text> */}
            </View>

            {/* Details Content */}
            <View className='flex-row justify-around mt-2'>

              <View className='flex-col '>
                <Text className='text-textTertiary text-xl font-semibold '>66/100</Text>
                <Text className='text-white/90 text-2xl mt-2'>Cases</Text>
              </View>
              <View className='flex-col '>
                <Text className='text-textTertiary text-xl font-semibold '>Total Target</Text>
                <Text className='text-white/90 text-2xl mt-2'>100 Cases</Text>
              </View>
              <View className='flex-col '>
                <Text className='text-textTertiary text-xl font-semibold '>Total Achieved</Text>
                <Text className='text-white/90 text-2xl mt-2'>60 Cases</Text>
              </View>

            </View>

            {/* Scrollable Brand Cards Grid */}
            <ScrollView 
              className='mt-6 px-4 bg-none' 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
              // className='mt-6 px-4'
            >
              
              <View className='flex-row flex-wrap justify-between bg-dashboardGradient4 rounded-3xl px-4 py-4 w-full'>

                 {/* <LinearGradient id={`grad`} x1="0" y1="0" x2="1" y2="1">
                              <Stop offset="0%" stopColor="#D90500" />
                              <Stop offset="100%" stopColor={""} />
                            </LinearGradient> */}
                <View className='w-1/2 '>
                  <BrandCard
                    logo={Icons.budweiser}
                    cases={25}
                    percentage={83}
                    gradientColors={['#FF6A00', '#FFCC00']}
                    ringColor='#FF6A00'
                  />
                </View>

                <View className='w-1/2'>
                  <BrandCard
                    logo={Icons.hoegaarden}
                    cases={14}
                    percentage={72}
                    gradientColors={['#4169E1', '#87CEEB']}
                    ringColor='#4169E1'
                  />
                </View>

                <View className='w-1/2'>
                  <BrandCard
                    logo={Icons.corona}
                    cases={22}
                    percentage={55}
                    gradientColors={['#32CD32', '#90EE90']}
                    ringColor='#32CD32'
                  />
                </View>

                <View className='w-1/2'>
                  <BrandCard
                    logo={Icons.magnum}
                    cases={5}
                    percentage={50}
                    gradientColors={['#FFD700', '#FFA500']}
                    ringColor='#FFD700'
                  />
                </View>
              </View>
            </ScrollView>


          </View>


        </ImageBackground>
        {/* Image outside the overflow hidden container */}
        <Image source={Images.budweiserBoxes} className='w-[180px] h-[170px] absolute right-6 -top-10' />
      </View>
    </View>
  );
}

export default Home