import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="enrollment" />
      {/* <Stack.Screen name="otp" /> */}
    </Stack>
  );
}
