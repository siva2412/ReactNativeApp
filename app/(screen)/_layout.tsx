import { Stack } from "expo-router";

export default function ScreenLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="enrollmentscreen" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="orders" />
      <Stack.Screen name="cart" />
    </Stack>
  );
}
