import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { getData, storeData } from '../../utils/storage'

const OTP = () => {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for OTP verification
    setTimeout(async () => {
      try {
        // For demo purposes, accept any 6-digit OTP
        // In real app, verify with backend
        
        // Store authentication token
        const isEnrolled: boolean = await getData('isEnrolled') ?? false;
        const token = 'demo_auth_token_' + Date.now();
        await storeData('token', token);
        
        setIsLoading(false);

        if(isEnrolled === true ){ 

          router.replace('/(tabs)/home');
        }else{
          router.replace('/(screen)/profile/termsandcondition');
        }
        // Navigate to home
      } catch (error) {
        setIsLoading(false);
        Alert.alert('Error', 'Failed to verify OTP. Please try again.');
      }
    }, 1500);
  };

  const handleResendOTP = () => {
    Alert.alert('Success', 'OTP has been resent to your phone number');
  };

  return (
    <View className="flex-1 justify-center items-center bg-primary px-6">
      <Text className="text-4xl font-bold text-secondary text-center mb-8">
        Verify OTP
      </Text>
      <Text className="text-lg text-white text-center mb-8">
        Enter the 6-digit OTP sent to your phone
      </Text>
      
      <View className="w-full mb-6">
        <TextInput
          className="bg-white p-4 rounded-lg text-lg text-center tracking-widest"
          placeholder="000000"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
          maxLength={6}
        />
      </View>
      
      <TouchableOpacity 
        className={`py-4 px-8 rounded-lg w-full mb-4 ${isLoading ? 'bg-gray-400' : 'bg-secondary'}`}
        onPress={handleVerifyOTP}
        disabled={isLoading}
      >
        <Text className="text-white text-lg font-semibold text-center">
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleResendOTP}>
        <Text className="text-white text-base underline">
          Resend OTP
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default OTP