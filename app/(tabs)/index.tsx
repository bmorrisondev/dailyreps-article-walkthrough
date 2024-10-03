import { ActivityIndicator, Image, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import ListItem from '@/components/ListItem';
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "@/components/Button";
import { router } from 'expo-router';

export default function HomeScreen() {
  const start = new Date()
  start.setHours(0,0,0,0)
  const end = new Date()
  end.setHours(23, 59, 59, 999)

  const workouts = useQuery(api.workouts.listWithReps, {
    start: start.getTime(),
    end: end.getTime()
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>

      <ThemedView style={styles.stepContainer}>
        {!workouts ? <ActivityIndicator size="large" /> : (
          <>
          <Button onPress={() => router.push("/new-workout")}>
            <Ionicons size={16} name="add-outline" /> New workout
          </Button>
          {workouts.map(({ _id, name, currentReps, targetReps }) => (
            <ListItem key={_id} onPress={() => router.push(`/log-reps/${_id}`)}>
              { name } ({currentReps ?? 0}/{targetReps})
            </ListItem>
          ))}
          </>
        )}
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
