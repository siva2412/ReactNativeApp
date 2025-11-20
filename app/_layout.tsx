import { AlertProvider } from "@/components/alert/AlertProvider";
import { AppLoaderProvider } from "@/components/loader/LoaderProvider";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import './../global.css';

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1">
      {/* <Toast /> */}
      <AppLoaderProvider>

        <AlertProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(screen)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </AlertProvider>
      </AppLoaderProvider>
    </SafeAreaView>
  )
}
