import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { getData } from "../utils/storage";

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await getData("token");
        
        if (token) {
          // Token exists, go to home
          router.replace("/(tabs)/home");
        } else {
          // No token, go to login
          router.replace("/(auth)/login");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        // On error, default to login
        router.replace("/(auth)/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#EC4899" />
        <Text className="text-white mt-4 text-lg">Loading...</Text>
      </View>
    );
  }

  // This should not be reached due to navigation redirects
  return (
    <View className="flex-1 justify-center items-center bg-primary">
      <Text className="text-white">Redirecting...</Text>
    </View>
  );
}
