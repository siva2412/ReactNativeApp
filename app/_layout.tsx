import { AlertProvider } from "@/components/alert/AlertProvider";
import { AppLoaderProvider } from "@/components/loader/LoaderProvider";
import { Stack } from "expo-router";
import { Text, TextInput, useColorScheme } from "react-native";
import 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";
import './../global.css';

// Extend Text and TextInput types to support defaultProps
interface TextWithDefaultProps extends Text {
  defaultProps?: any;
}

interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: any;
}

export default function RootLayout() {

  const theme = useColorScheme();
// prevent app rendering before fonts load

  return (
    <SafeAreaView
      className={`flex-1 bg-${theme === "dark" ? "black" : "white"}`}
      edges={["left", "right", "top", "bottom"]}
    >
      <AppLoaderProvider>
        <AlertProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(screen)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="(cart)" options={{ headerShown: false }} /> */}
          </Stack>
        </AlertProvider>
      </AppLoaderProvider>
    </SafeAreaView>
  );
}
