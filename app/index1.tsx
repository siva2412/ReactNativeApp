import { getData } from "@/utils/storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {

  const router = useRouter();
  useEffect(()=>{
    console.log("Index screen mounted");
    getData("token").then((token)=>{
      console.log("Retrieved token:", token);

      if (token) {
        console.log("Token exists, navigate to dashboard");
      }else{
        console.log("No token found, stay on index screen");
        router.replace("/(auth)/login");
      }
    }).catch((error)=>{
      console.error("Error retrieving token:", error);
    });
  },[])

  return (
    <View className="flex-1 justify-center items-center bg-primary">
      <Text className="text-4xl font-bold text-secondary text-center px-4">
        Welcome to Bud4Trade!
      </Text>
      <Text className="text-lg text-white mt-4 text-center px-4">
        Your React Native app is working perfectly!
      </Text>
    </View>
  );
}
