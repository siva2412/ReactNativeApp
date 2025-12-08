import { Stack } from "expo-router";

export default function CartLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="cartitem" />
        <Stack.Screen name="cartdetails" />
      {/* <Stack.Screen name="otp" /> */}
    </Stack>
  );
}
