import { Icons } from '@/constants/Icons';
import { Tabs } from 'expo-router';
import { Image, StatusBar, useColorScheme } from 'react-native';

export default function TabLayout() {

   const theme = useColorScheme();

  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme === "dark" ? "#000" : "#fff"}
        animated={true}
        translucent={true}
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#ab1411',
            borderTopWidth: 0,
            // height: 60,
          },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#ffffff',
          tabBarLabelStyle: {fontSize: 14,fontWeight: '500' ,alignItems: 'center'},
          tabBarItemStyle: {
            flex:1, justifyContent: 'center',
            alignItems: 'center',
          },
          animation: "shift",
        }}

      >
        <Tabs.Screen
          name="home"

          options={{
            title: 'Home',
            tabBarIcon: () => (
              <Image source={Icons.home} style={{ width: 24, height: 24 }} />
            ),
          }}
        />
        
        <Tabs.Screen
          name="bonus"

          options={{
            title: 'Bonus',
            tabBarIcon: () => (
              <Image source={Icons.bonus} style={{ width: 24, height: 24 }} />
            ),
          }}
        />
        <Tabs.Screen
          name="upiredemption"

          options={{
            title: 'UPI',
            tabBarIcon: () => (
              <Image source={Icons.upi} style={{ width: 24, height: 24 }} />
            ),
          }}
        />
        <Tabs.Screen
          name="rewards"

          options={{
            title: 'Rewards',
            tabBarIcon: () => (
              <Image source={Icons.rewards} style={{ width: 24, height: 24 }} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}