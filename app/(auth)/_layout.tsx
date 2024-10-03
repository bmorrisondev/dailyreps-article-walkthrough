import { Redirect } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AuthRoutesLayout() {
  const colorScheme = useColorScheme();
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false
      }}
      sceneContainerStyle={{
        backgroundColor: "white"
      }}>
      <Tabs.Screen
        name="sign-in"
        options={{
          title: 'Sign in',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sign-up"
        options={{
          title: 'Sign up',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person-add' : 'person-add-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}