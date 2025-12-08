import AlertService from '@/components/alert/AlertService'
import Dropdown from '@/components/Dropdown/Dropdown'
import LoaderService from '@/components/loader/LoaderService'
import { Images } from '@/constants/images'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { goBack } from 'expo-router/build/global-state/routing'
import React, { useRef, useState } from 'react'
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const RewardDetail = () => {

    const router = useRouter();
    const { id, name } = useLocalSearchParams() //get from route params
    const [refresh, setRefresh] = useState(0);
    const [denominationModalVisible, setDenominationModalVisible] = useState(false);
    const howtoredeem = [
        "To add your GC to your Amazon Pay balance, visit www.amazon.in/addgiftcard",
        "Customer can apply the 14 digit code (PIN received in your Wallet section) on amazon.in/addgiftcard and add the Gift Card balance in his/her Amazon.in account.",
        "Customer can add multiple Gift Cards to an account."
    ];


    interface Rewards {
        denomination: number;
        points: number;
        quantity?: string;
    }
    const rewardQuantity: Rewards[] = [
        { "denomination": 500, "points": 500 },
        { "denomination": 1000, "points": 1000 },
        { "denomination": 1500, "points": 1500 },
        { "denomination": 2000, "points": 2000 },
        { "denomination": 2500, "points": 2500 },
        { "denomination": 3000, "points": 3000 },
    ];

    const denominations = useRef<string[]>(
        rewardQuantity.map(() => "0")
    );

    const resetDenominations = () => {
        denominations.current = rewardQuantity.map(() => "0");
    }


    const handleQuantityChange = (value: string, index: number) => {
        denominations.current[index] = value;
        setRefresh(prev => prev + 1);
    };

    const addtocart = () => {
        // Logic to add selected denominations to cart
        LoaderService.show("Adding to cart...");
        setDenominationModalVisible(!denominationModalVisible);
        // console.log("Adding to cart:", denominations.current);
        AsyncStorage.removeItem('rewardCart');
        const cartData = rewardQuantity
            .map((item, index) => ({
                ...item,
                quantity: parseInt(denominations.current[index] || "0", 10),
            }))
            .filter(item => item.quantity > 0);  // keep only selected rows

        //console.log("Final Cart Data:", cartData);

        AsyncStorage.setItem('rewardCart', JSON.stringify(cartData));

        setTimeout(() => {
            if (cartData.length > 0) {
                router.push('/(screen)/cart/cartitem');
            }else{
                AlertService.show("Please select at least one quantity to add to cart.");
            }
            resetDenominations();
            LoaderService.hide();
        }, 1000);
    }


    const number = [Array.from({ length: 10 }, (_, i) => i + 1)].flat().map(String);

    const Tnc = `Disclaimer: In the event of any discrepancy or conflict, the English version will prevail over the translation.
            Last updated: November 02, 2022
            These terms and conditions apply to Amazon Pay Gift Cards (Gift Cards) issued by Pine Labs Private Limited (Pine Labs) under the brandname of Qwikcilver and co-branded with Amazon Pay (India) Private Limited (Amazon Pay). Pine Labs is a private limited company organized under the laws of India, and is the issuer of the Gift Cards. You may purchase Gift Cards through various options available on www.amazon.in corresponding mobile site and mobile application ("Amazon.in"), and also use Gift Cards provided to you by third parties in the manner provided hereunder. By purchasing or using a Gift Card, you are agreeing to and accept these terms and conditions.
            Redemption: Gift Cards may only be redeemed toward the purchase of eligible products on Amazon.in and any other third party merchants that are enabled to accept the Gift Cards. Purchases are deducted from the redeemer's Gift Card balance. Any unused Gift Card balance will remain associated with the redeemers Amazon Pay balance account and applied to purchases, in order of earliest expiration date. If a purchase exceeds the redeemers Gift Card balance, the remaining amount must be paid by credit card, net banking or debit card. No fees or charges apply to Gift Cards. Pine Labs may provide Gift Card purchasers with information about the redemption status of Gift Cards that they purchase or use. Certain merchants may provide you services only on the pre-condition that you allow us to hold balances in your Amazon Pay balance: Gift Card till the service completion by the merchant. However, your prior consent would be taken before holding such balances. In such cases, you agree and authorize us to: (i) hold your balance until service completion; and (ii) fail the transaction if your balance in the Amazon Pay Gift Card has expired at the end of the services.
            1. Limitations: Gift Cards, including any unused Gift Card balances, expire one year from the date of issuance. You may request for revalidation of any expired Gift Cards. Upon receipt of such request, the Gift Card may be revalidated after due verification and subject to applicable terms and conditions. Gift Cards may only be purchased in denominations ranging from Rs. 10 to Rs. 10,000 or such other limits as Pine Labs may determine. Gift Cards cannot be used to purchase other gift cards. Gift Cards cannot be reloaded, resold, transferred for value or redeemed for cash. Except as provided hereunder or as per applicable law, amount in your Gift Cards will not be refunded to you under any circumstances. No refund will be provided in cash, at any point of time. Unused Gift Card balances may not be transferred to another users account. No interest will be payable by Pine Labs on any Gift Card or Gift Card balance. Pine Labs make no representation or warranty that Amazon.in will always be accessible without interruption.
            2. Fraud: Pine Labs is not responsible if a Gift Card is lost, stolen, destroyed or used without permission. Amazon Seller Services Private Limited (together with Amazon Pay is referred to as 'Amazon') will have the right to close customer accounts and take payment from alternative forms of payment if a fraudulently obtained Gift Card is redeemed and/or used to make purchases on Amazon.in.
            3. Governing Law and Jurisdiction: These terms and conditions are governed by and construed in accordance with the laws of India. You, Pine Labs and Amazon each agree to submit to the exclusive jurisdiction of the courts at Bangalore. You agree to indemnify Pine Labs and Amazon for all claims brought by a third party against it or its affiliates arising out of or in connection with a breach of any of these terms and conditions.
            4. Limitation of Liability: NEITHER PINE LABS NOR AMAZON MAKE ANY WARRANTIES, EXPRESS OR IMPLIED, WITH RESPECT TO GIFT CARDS, INCLUDING WITHOUT LIMITATION, ANY EXPRESS OR IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN THE EVENT A GIFT CARD IS NON-FUNCTIONAL, YOUR SOLE REMEDY WILL BE THE REPLACEMENT OF SUCH GIFT CARD. IF APPLICABLE LAW DOES NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS, OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
            5. Password Security: You shall, at all times, keep the passwords that are generated by you strictly confidential and not reveal the same to any person or entity.
            6. General Terms: The Amazon.in Conditions of Use apply to Gift Cards. Pine Labs reserves the right to change these Gift Card terms and conditions from time to time in its discretion and without prior notice to you. All terms and conditions are applicable to the extent permitted by law.
            7. Contact Information: Website address: www.qwikcilver.com
            8. View your gift card transaction statement: https://amazonbal.qwikcilver.com`



    return (
        <View className='flex-1 bg-gray-100'>
            <View className='flex-row w-full bg-primary'>
                <Ionicons name="arrow-back-outline" size={30} color="white" className='m-4' onPress={() => { goBack() }} />
                <Text className='text-white text-xl  mt-5'>Gift Card</Text>
            </View>
            {/* Body */}
            <View>

                <View className='px-6 pt-4'>
                    <Text className='text-2xl font-bold mb-4'>{name}</Text>
                </View>
                <View className='px-6 pt-4 w-full items-center'>
                    <Image source={Images.giftcard1} className='w-full' />
                </View>

                <View className='px-6 py-8'>
                    <Text className='text-xl font-bold mb-2'>How to Redeem</Text>
                    {
                        howtoredeem.map((item, index) => (
                            <Text key={index} className='mb-2'> {index + 1}. {item} </Text>
                        ))
                    }
                </View>
                <View className='px-6 pb-8'>
                    <Text className='text-xl font-bold mb-2'>Terms and Conditions</Text>
                    <ScrollView className='mt-2' style={{ maxHeight: 200 }}>
                        <Text className='text-sm text-gray-600'>{Tnc}</Text>
                    </ScrollView>
                </View>

                {/* Footer */}
                <TouchableOpacity className='items-center py-4 bg-primary rounded-3xl px-4 mx-6 mb-4' onPress={() => setDenominationModalVisible(!denominationModalVisible)}>
                    <Text className='text-xl font-bold text-white'>Add to Cart</Text>
                </TouchableOpacity>
            </View>

            <Modal animationType="slide" transparent={true} visible={denominationModalVisible} onRequestClose={() => { setDenominationModalVisible(!denominationModalVisible); }}>
                <View className="flex-1 justify-end bg-black/80 bg-opacity-50">
                    <View className="bg-primary rounded-t-3xl px-6 py-10 ">
                        <View className='absolute top-0 right-0'>
                            <Ionicons name="close-circle-outline" size={30} color="white" className='self-end m-4' onPress={() => { setDenominationModalVisible(!denominationModalVisible); }} />
                        </View>
                        <View className='items-center'>
                            <Text className="text-2xl text-white font-bold mb-4 mt-4">Select Quantity</Text>
                        </View>

                        <View className='mb-3'>

                            {
                                rewardQuantity.map((item, index) => (
                                    <View key={index} className='mb-1 flex-row items-center justify-evenly'>
                                        <Text className='text-2xl font-semibold text-white w-10'>Qty</Text>

                                        <View className='mx-2  rounded-xl px-2 '>
                                            <Dropdown
                                                // key={denominations.current[index]}
                                                options={number}
                                                placeholder=''
                                                value={denominations.current[index]}
                                                label='Quantity'
                                                onChange={(value) => handleQuantityChange(value, index)}
                                                darkMode={true}
                                                width={80}

                                            />
                                        </View>

                                        <View className='bg-white px-4 py-2 rounded-xl mx-1 min-w-[80px] items-center'>
                                            <Text className='text-base font-bold text-black'>₹{item.denomination}</Text>
                                        </View>

                                        <View className='flex-row bg-white px-3 py-2 rounded-xl items-center justify-center min-w-[90px]'>
                                            <View className='bg-primary rounded-full p-1 mr-1'>
                                                <Ionicons name="star" size={16} color="white" />
                                            </View>
                                            <Text className='text-base font-bold text-black'>₹{item.points}</Text>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>

                        <View className="flex-row justify-evenly mt-6">
                            <View className='w-[48%]'>

                                <TouchableOpacity className='items-center py-4 rounded-3xl  w-full' onPress={() => { setDenominationModalVisible(!denominationModalVisible); resetDenominations() }}>
                                    <Text className='text-2xl font-bold text-white'>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            <View className='w-[48%]'>
                                <TouchableOpacity className='items-center py-4 bg-white rounded-xl  w-full' onPress={() => addtocart()}>
                                    <Text className='text-2xl font-semibold text-primary'>ADD</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </View>
            </Modal>




        </View>



    )
}

export default RewardDetail