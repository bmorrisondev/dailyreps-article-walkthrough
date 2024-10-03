import { styles } from '@/constants/styles'
import Button from '@/components/Button'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Alert, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

function EditEntry() {
  const local = useLocalSearchParams()
  const [reps, setReps] = React.useState("")

  const entry = useQuery(api.logged_reps.getEntry, {
    entryId: local.entryId as string
  })
  const updateMutation = useMutation(api.logged_reps.update)
  const removeMutation = useMutation(api.logged_reps.remove)

  React.useEffect(() => {
    if(entry) {
      setReps(entry.reps.toString())
    }
  }, [entry])


  async function onSavePressed() {
    await updateMutation({
      entryId: local.entryId as string,
      reps: Number(reps)
    })
    router.back()
  }

  function onDeletePressed() {
    Alert.alert('Confirm', 'Are you sure you want to delete this entry?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: onConfirmDeletePressed,
        style: 'destructive'
      },
    ]);
  }

  async function onConfirmDeletePressed() {
    router.back()
    await removeMutation({ entryId: local.entryId as string })
  }

  return (
    <View style={styles.screen}>
      <Text>Reps</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={reps}
        onChangeText={val => setReps(val)} />
      <Button onPress={onSavePressed}>
        <Text>Save</Text>
      </Button>
      <Button onPress={onDeletePressed}>
        <Text>Delete</Text>
      </Button>
    </View>
  )
}

export default EditEntry