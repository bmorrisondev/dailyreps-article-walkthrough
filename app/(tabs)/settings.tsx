import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Button from '@/components/Button';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import ListItem from '@/components/ListItem';
import { router } from 'expo-router';

export default function Settings() {
  const { user } = useUser()
  const { signOut } = useAuth();

  const workouts = useQuery(api.workouts.list)

  const onSignOutPress = async () => {
    try {
      await signOut({ redirectUrl: "/" });
    } catch (err: any) {}
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="cog" style={styles.headerImage} />}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Settings</ThemedText>
          <ThemedText type="defaultSemiBold">Signed in as {user?.emailAddresses[0].emailAddress}.</ThemedText>
        </ThemedView>
        <Button onPress={onSignOutPress}>
          Sign out
        </Button>
        <ThemedText type="subtitle">
          Edit workouts
        </ThemedText>
        {!workouts ? <ActivityIndicator size="large" /> : (
          <ThemedView>
            {workouts.map(w => (
              <ListItem
                key={w._id}
                onPress={() => router.push(`/edit-workout/${w._id}`)}>
                <ThemedText>
                  {w.name}
                </ThemedText>
              </ListItem>
            ))}
          </ThemedView>
        )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
  }
});