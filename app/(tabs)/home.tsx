import AlertService from '@/components/alert/AlertService'
import BrandCard from '@/components/BrandCard/BrandCard'
import { Icons } from '@/constants/Icons'
import { Images } from '@/constants/images'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, ImageBackground, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { removeData } from '../../utils/storage'
const Home = () => {
  const router = useRouter();

  const [burgerMenuVisible, setBurgerMenuVisible] = useState(false);

  const handleLogout = async () => {
    
    AlertService.show( "Are you sure you want to logout?", "Logout",[
        {
          text: 'Cancel',
          style: 'bg-primary',
          onPress: () => {AlertService.hide()},
        },
        {
          text: 'Logout',
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
      ])
  };

  return (
    <View className="flex-1">
      <View className='flex-1 max-h-[45%] w-full'>
        <ImageBackground source={Images.dashboardBanner} className="flex-1 pb-5">
          <View className='flex-1'>
            <View className=''>

              <Ionicons name="menu-outline" size={30} color="white" className={`m-4 ${burgerMenuVisible ? '' : ''}`} onPress={() => { setBurgerMenuVisible(!burgerMenuVisible) }} />
            </View>
            <View className='flex-row justify-between mx-4'>
              <View>

                <Text className='text-white text-4xl font-bold pt-2'>Hello Rohan!</Text>
                <Text className='text-textTertiary text-base mt-2 '>Flame Pub & Restaurant</Text>
              </View>
              <View className=' flex-row px-2  '>

                <View className='px-2 py-2 '>
                  <View className='flex-row  items-center bg-primary rounded-3xl px-4 py-2 mb-1'>
                    <Image source={Icons.point} className='w-8 h-8' />
                    <Text className='text-white text-xl font-bold text-right'>
                      2000
                    </Text>
                  </View>
                  <Text className='text-textTertiary text-base'>
                    Points Balance
                  </Text>
                </View>
              </View>
            </View>
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
              <TouchableOpacity onPress={() => router.push('/(screen)/targetandachivement/targetandachivementdetails')}>
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
              </TouchableOpacity>
            </ScrollView>


          </View>


        </ImageBackground>
        {/* Image outside the overflow hidden container */}
        <Image source={Images.budweiserBoxes} className='w-[180px] h-[170px] absolute right-6 -top-10' />
      </View>


      {/* Burger Menu Options */}
      <Modal visible={burgerMenuVisible} onRequestClose={() => setBurgerMenuVisible(false)} transparent animationType="slide">
        <View className='flex-1 bg-primary ' style={{ paddingTop: 10,marginTop:50 }}>
          <View className="px-4 py-1 mt-0" onTouchStart={() => setBurgerMenuVisible(false)}>
            <Ionicons name="close-outline" size={30} color="white" />
          </View>
          <View className=" px-10 mt-6">
            <TouchableOpacity className="mb-6 flex-row items-center" onPress={() => { setBurgerMenuVisible(false); router.push('/(screen)/profile/myprofile'); }}>
              <Text className="text-white text-2xl ml-4">Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-6 flex-row items-center" onPress={() => { setBurgerMenuVisible(false); router.push('/(screen)/profile/abouttheprogram'); }}>
              <Text className="text-white text-2xl ml-4">About the Program</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-6 flex-row items-center" onPress={() => { setBurgerMenuVisible(false);  router.push('/(screen)/profile/trackrewards'); }}>
              <Text className="text-white text-2xl ml-4">Track Rewards</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-6 flex-row items-center" onPress={() => { setBurgerMenuVisible(false); router.push('/(screen)/profile/ledger'); }}>
              <Text className="text-white text-2xl ml-4">Ledger</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-6 flex-row items-center" onPress={() => { setBurgerMenuVisible(false); router.push('/(screen)/profile/faq'); }}>
              <Text className="text-white text-2xl ml-4">FAQS</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-6 flex-row items-center" onPress={() => { setBurgerMenuVisible(false); router.push('/(screen)/profile/profiletandc'); }}>
              <Text className="text-white text-2xl ml-4">Terms & Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-6 flex-row items-center" onPress={() => { setBurgerMenuVisible(false); router.push('/(screen)/profile/privacypolicy'); }}>
              <Text className="text-white text-2xl ml-4">Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-6 flex-row items-center" onPress={() => { setBurgerMenuVisible(false); router.push('/(screen)/profile/customerservices'); }}>
              <Text className="text-white text-2xl ml-4">Customer Service</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-6 flex-row items-center" onPress={() => { setBurgerMenuVisible(false); handleLogout(); }}>
              <Text className="text-white text-2xl ml-4">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Home