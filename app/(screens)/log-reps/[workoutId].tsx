import { TextInput, View } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import React from 'react';
import { router }  from 'expo-router';
import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '@/constants/styles'

function LogReps() {
  const local = useLocalSearchParams();
  const [reps, setReps] = React.useState('10')
  const workout = useQuery(api.workouts.getWorkout, {
    id: local.workoutId as string
  })
  const logReps = useMutation(api.logged_reps.logReps)

  async function onAddNewWorkoutPressed() {
    await logReps({
      workoutId: local.workoutId as string,
      reps: Number(reps)
    })
    router.back()
  }

  return (
    <View style={styles.screen}>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="title">
          {workout?.name}
        </ThemedText>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          value={reps}
          onChangeText={setReps} />
        <Button onPress={onAddNewWorkoutPressed}>
          Save
        </Button>
      </ThemedView>
    </View>
  )
}

export default LogReps
