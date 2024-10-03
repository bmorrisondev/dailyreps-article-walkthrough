import { View } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { SignedIn } from '@clerk/clerk-expo';
import { Text } from 'react-native'
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import React from 'react';
import { router }  from 'expo-router';
import Button from '@/components/Button';
import { styles } from '@/constants/styles'
import { TextInput } from 'react-native-gesture-handler';

function NewWorkout() {
  const [name, setName] = React.useState('');
  const [targetReps, setTargetReps] = React.useState('10')
  // useMutation references the new `insert` mutation in workouts.ts
  const addWorkout = useMutation(api.workouts.insert)

  async function onAddNewWorkoutPressed() {
    await addWorkout({
      name,
      targetReps: Number(targetReps)
    })
    router.back()
  }

  return (
    <View style={styles.screen}>
      <SignedIn>
        <ThemedView style={styles.stepContainer}>
          <Text>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName} />
          <Text>Target reps</Text>
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            value={targetReps}
            onChangeText={setTargetReps} />
          <Button onPress={onAddNewWorkoutPressed}>
            Save
          </Button>
        </ThemedView>
      </SignedIn>
    </View>
  )
}

export default NewWorkout
