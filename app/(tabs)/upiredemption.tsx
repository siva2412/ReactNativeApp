import LoaderService from '@/components/loader/LoaderService'
import { Icons } from '@/constants/Icons'
import { Images } from '@/constants/images'
import { commonRegex } from '@/utils/regex'
import { getData, storeData } from '@/utils/storage'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { goBack } from 'expo-router/build/global-state/routing'
import React, { useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

const UpiRedemption = () => {

  const [setError, setSetError] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [upiExist, setUpiExist] = useState(false);
  const [Amount, setAmount] = useState('');
  const router = useRouter();
  // 
  useEffect(() => {
    // setUpiId('');
    const fetchUpiId = async () => {
      const storedUpiId = await getData("upiId"); // Replace with actual fetch logic
      if (storedUpiId) {
        setUpiId(storedUpiId);
        setUpiExist(true);
      }
    };
    fetchUpiId();
  }, []);


  // UPI ID Change Handler

  const handleonChange = (text: string) => {
    // Handle UPI ID change
    console.log('UPI ID:', text);
    if (commonRegex.strictUpi.test(text)) {
      setSetError(false);
      setUpiId(text);
    } else {
      setSetError(true);
    }
  }

  const handleSubmit = () => {
    // Handle UPI ID submission
    LoaderService.show("Submitting UPI ID...");
    setTimeout(() => {
      storeData("upiId", upiId);
      setUpiExist(true);
      LoaderService.hideLoader();
    }, 2000);

  }

  // Redemption Handler

  const handleAmountChange = (text: string) => {
    setAmount(text);
  }

  const handleRedemptionSubmit = () => {
    // Handle Redemption submission

    // if (Amount === '' || isNaN(Number(Amount)) || Number(Amount) <= 0) {
    //   AlertService.show('Please enter a valid amount to redeem.');
    //   return;
    // }

    // if (Number(Amount) > 2500) {
    //   AlertService.show('You do not have sufficient points to redeem this amount.');
    //   return;
    // }
    LoaderService.show("Processing Redemption...");
    setTimeout(() => {
      LoaderService.hide();
      setAmount('');
      router.replace('/(screen)/orders/cashcheckout');
    }, 500);
  }


  return (
    <View className='flex-1 bg-white'>
      {/* Header */}
      <View className='flex-row w-full bg-primary'>
        <Ionicons name="arrow-back-outline" size={30} color="white" className='m-4' onPress={() => { goBack() }} />
        <Text className='text-white text-xl  mt-5'>UPI </Text>

      </View>

      {/* Content */}

      {
        upiExist === false ? (
          <View className='px-6 py-5'>
            <View>

              <Text className='text-4xl font-bold'>
                Enter your UPI ID
              </Text>
              <Text className='text-base text-gray-600 mt-2'>
                Redeem your Bud4Trade points for cash into your bank account!
              </Text>
            </View>
            <View className='mt-5  flex-row justify-between'>
              <View>
                <View className='flex-row items-center bg-primary rounded-3xl px-2 py-2' >
                  <Image source={Icons.point} className='w-8 h-8 self-center' />
                  <Text className='text-2xl font-bold text-center px-2 text-white'>2500</Text>
                </View>
                <Text className='text-center text-gray-600'>
                  Points Earned
                </Text>
              </View>
              <View>
                <View className='flex-row items-center bg-primary rounded-3xl px-2 py-2' >
                  <Image source={Icons.point} className='w-8 h-8 self-center' />
                  <Text className='text-2xl font-bold text-center px-2 text-white'>2500</Text>
                </View>
                <Text className='text-center text-gray-600'>
                  Points Redeemed
                </Text>
              </View>
              <View>
                <View className='flex-row items-center bg-primary rounded-3xl px-2 py-2' >
                  <Image source={Icons.point} className='w-8 h-8 self-center' />
                  <Text className='text-2xl font-bold text-center px-2 text-white'>2500</Text>
                </View>
                <Text className='text-center text-gray-600'>
                  Points Balance
                </Text>
              </View>
            </View>

            {/* UPI */}

            <View className='mt-10  '>

              <Text className='absolute -top-1 left-2 bg-white z-10 px-4'>Enter UPI ID</Text>
              <TextInput
                placeholder='example@bank'
                onChangeText={handleonChange}
                className='mt-2 border border-gray-300 rounded-lg px-4 py-4'
              />
              {setError && (
                <Text className='text-red-500 mt-2'>Please enter a valid UPI ID.</Text>
              )}
            </View>

            <View>
              <TouchableOpacity
                className={`${setError ? 'opacity-50' : ''} bg-primary rounded-3xl px-4 py-3 mt-10 mb-5`}
                disabled={setError}
                onPress={handleSubmit}
              >
                <Text className='text-white text-center text-xl font-bold'>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>

          </View>)
          : (
            <View className='flex-1 px-6 py-5'>

              <View className='justify-center items-center mt-10 mb-10'>

                <Image source={Images.upi} className='w-30 h-14 mt-10 ' />
                <Text className='text-base  px-6 py-5'>
                  {upiId}
                </Text>

              </View>

              <View className='flex-row mt-6 justify-between'>

                <View className='bg-primary flex-row rounded-3xl py-2  justify-center items-center p-4'>
                  <View className='mr-2'>
                    <Image source={Icons.point} className='w-16 h-15 self-center mt-4' />
                  </View>
                  <View className=''>
                    <Text className='text-md text-base text-center  text-textTertiary '>Points Balance</Text>
                    <Text className='text-3xl font-bold text-start text-white '>2500</Text>
                  </View>
                </View>
                <View className='bg-primary flex-row rounded-3xl py-2  justify-center items-center p-4'>
                  <View className='mr-2'>
                    <Image source={Icons.point} className='w-16 h-15 self-center mt-4' />
                  </View>
                  <View className=''>
                    <Text className='text-md text-base text-center  text-textTertiary '>Points Cash Value</Text>
                    <Text className='text-3xl font-bold text-start text-white '>1000</Text>
                  </View>
                </View>

              </View>

              <View>
                <Text className='text-center text-gray-600 mt-5 px-6'>
                  (1Point = ₹4 )
                </Text>

              </View>

              {/* Amount */}

              <View className='mt-10  '>

                <Text className='absolute -top-1 left-2 bg-white z-10 px-4'>Enter the Point you want to Redeem</Text>
                <TextInput
                  placeholder={Amount}
                  value={Amount}
                  onChangeText={handleAmountChange}
                  keyboardType='numeric'
                  className='mt-2 border border-gray-300 rounded-lg px-6 py-6'
                />

                {/* {setError && (
                  <Text className='text-red-500 mt-2'>Please enter a valid UPI ID.</Text>
                )} */}
                {Amount && Amount !== '' && (
                  <View className='justify-center items-center mt-5 mb-5'>



                    <Text className=' text-2xl font-bold'>
                      Points Value : {parseInt(Amount) * 4}
                    </Text>
                  </View>)
                }
              </View>

              {/* Submit button */}

              <View>
                <TouchableOpacity
                  className={`${setError ? 'opacity-50' : ''} bg-primary rounded-3xl px-4 py-3 mt-10 mb-5`}
                  disabled={setError}
                  onPress={handleRedemptionSubmit}
                >
                  <Text className='text-white text-center text-xl font-bold'>
                    Redeem Now
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          )
      }
    </View>
  )
}

export default UpiRedemption