import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="termsandcondition" />
      <Stack.Screen name="abouttheprogram" />
      <Stack.Screen name="customerservices" />
      <Stack.Screen name="faq" />
      <Stack.Screen name="ledger" />
      <Stack.Screen name="myprofile" />
      <Stack.Screen name="privacypolicy" />
      <Stack.Screen name="profiletandc" />
      <Stack.Screen name="trackrewards" />
      {/* <Stack.Screen name="otp" /> */}
    </Stack>
  );
}
