// import { useAlert } from '@/components/alert/AlertProvider';
import LoaderService from '@/components/loader/LoaderService';
import { storeData } from '@/utils/storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
const Login = () => {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [loginpage, setLoginpage] = useState(true);

    const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);

    const inputsRef = useRef<any>([]);
    const userData: any = [];

    const handleOtpChange = (value: string, index: number) => {
        // 1. Only digits allowed
        if (!/^[0-9]?$/.test(value)) return;

        const otpCopy = [...otpArray];

        // 2. Prevent typing in future boxes (index > first empty index)
        const firstEmptyIndex = otpCopy.findIndex((digit) => digit === "");
        if (firstEmptyIndex !== -1 && index > firstEmptyIndex) {
            return; // ⛔ Don't allow skipping boxes
        }

        // 3. Handle Backspace
        if (value === "") {
            otpCopy[index] = "";
            setOtpArray([...otpCopy]);

            if (index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
            return;
        }

        // LoaderService.show('Verifying OTP...');

        setTimeout(() => {
            otpCopy[index] = value;
            setOtpArray([...otpCopy]);
            
            // 5. Move to next
            if (index < otpCopy.length - 1) {
                inputsRef.current[index + 1]?.focus();
            }
            
            


        }, 3000);
        // 4. Normal typing → fill box
        
    };

    const handleLogin = async () => {
        // if (!phoneNumber.trim()) {
        //     AlertService.show('Please enter your phone number','Title', alertButtons);
        //     return;
        // }

        // if (phoneNumber.length < 10 || phoneNumber.length > 10) {
        //     AlertService.show('Please enter a valid 10-digit mobile number');
        //     return;
        // }

        // if (commonRegex.phone.test(phoneNumber) === false) {
        //     AlertService.show('Please enter a valid mobile number');
        //     return;
        // }

        setIsLoading(true);

        LoaderService.show('Sending OTP...');

        setTimeout(() => {
            LoaderService.hide();
            setIsLoading(false);
            setLoginpage(false);
            // router.push('/(auth)/otp');
        }, 3000);
    };

    const handleSubmitOtp = async () => {
        setIsLoading(true);
        LoaderService.show('Verifying OTP...');

        setTimeout(() => {
            LoaderService.hide();
            
            userData.push([{
                "username": "johndoe",
                "email": "",
                "token": "abcdef1234567890"
            }]);
            
            storeData('userData', JSON.stringify(userData));
            storeData('token', 'abcdef1234567890');
            
            LoaderService.hide();
            // router.push('/(screen)/enrollment');
            router.push("/enrollmentscreen/enrollment");
            setIsLoading(false);
            // router.push('/(tabs)/home');
        }, 3000);
    }

    return (
        <>
            <View className="flex-1 bg-primary ">

                <View className='flex-1 items-center justify-center mb-8'>
                    <Ionicons name="phone-portrait-outline" size={100} color="white" className="self-center mb-6" />
                    <Text className='text-white text-4xl font-semibold'>Mobile number</Text>
                    <Text className='text-white text-1xl'>We need to send OTP to authenticate your number</Text>
                </View>
                <View className='bg-white w-full min-h-[45%] px-6 pt-10 rounded-t-5xl'>
                    {loginpage ?
                        (
                            <>
                                <Text className='text-5xl font-semibold mt-5 mb-10 text-gray-900'>
                                    Log in to your account
                                </Text>
                                <View className=" mb-10">
                                    <View
                                        className='flex-row items-center border border-gray-300 rounded-lg px-4 py-2'>
                                        <Text className='text-xl mr-2'>🇮🇳</Text>
                                        <Text className='text-xl mr-2 '>+91</Text>
                                        <TextInput
                                            className=" p-4 rounded-lg text-xl font-normal"
                                            placeholder="Mobile Number"
                                            value={phoneNumber}
                                            onChangeText={setPhoneNumber}
                                            keyboardType="phone-pad"
                                            maxLength={10}
                                        />
                                    </View>
                                </View>
                            </>
                        ) : (
                            <>
                                <Text className='text-5xl font-semibold mt-5 mb-10 text-gray-900'>
                                    Enter OTP
                                </Text>
                                <Text className='mb-10 text-gray-700 text-lg'>
                                    Enter the 6 digit code we sent to +91 {phoneNumber}
                                </Text>
                                <View
                                    className='flex-row justify-content mb-6'>

                                    {
                                        otpArray.map((digit, index) => (
                                            <TextInput
                                                key={index}
                                                cursorColor="transparent"
                                                ref={ref => { inputsRef.current[index] = ref }}
                                                className='w-14 h-14 border border-gray-300 rounded-xl text-center text-xl bg-white mx-2 font-semibold'
                                                placeholder="•"
                                                placeholderTextColor="text-gray-400"
                                                maxLength={1}
                                                value={digit}
                                                onChangeText={(text) => (
                                                    handleOtpChange(text, index)
                                                )}
                                                // onKeyPress={(e) => handleKeyPress(e, index)}
                                                keyboardType="phone-pad"

                                            />))
                                    }
                                    {/* <TextInput
                                    className=" p-4 rounded-lg text-xl font-normal mb-8 border border-gray-300"
                                    placeholder="1"
                                    value={otp}
                                    onChangeText={setOtp}
                                    keyboardType="phone-pad"
                                    maxLength={6}
                                /> */}
                                </View>

                                <Text className='text-base text-gray-700 mb-8'>
                                    If you haven’t received the code or it’s expired,
                                    <Text
                                        className="text-blue-500"
                                        // onPress={() => { }}
                                    >
                                        {" "}Resend OTP
                                    </Text>
                                </Text>


                            </>
                        )}

                    <TouchableOpacity
                        onPress={loginpage ? handleLogin : handleSubmitOtp}
                        disabled={isLoading}
                        activeOpacity={0.7}
                        className='w-full py-4 rounded-lg bg-primary'
                    >
                        <Text className="text-white text-lg font-semibold text-center">
                            {loginpage
                                ? 'Sent OTP'
                                : 'Submit'}
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>

            {
                !loginpage && (
                    < View
                        className="mb-8 flex-row justify-center absolute top-5 left-5"
                    >
                        <Ionicons name="arrow-back" size={30} color="white" className="self-center mr-2" onPress={() => setLoginpage(true)} />
                    </View >
                )
            }

        </>

    )
}

export default Login