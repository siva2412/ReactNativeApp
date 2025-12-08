import { Stack } from "expo-router";

export default function RewardsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="rewardlist" />
      {/* <Stack.Screen name="otp" /> */}
    </Stack>
  );
}
