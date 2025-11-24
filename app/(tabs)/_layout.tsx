import { Icons } from '@/constants/Icons';
import { Tabs } from 'expo-router';
import { Image, StatusBar } from 'react-native';

export default function TabLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#ab1411',
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#ffffff',
          tabBarLabelStyle: {fontSize: 14,fontWeight: '500' ,alignItems: 'center'},
          tabBarItemStyle: {
            flex:1, justifyContent: 'center',
            alignItems: 'center',
          }
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