import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api';
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import ListItem from './ListItem';

type Props = {
  date: Date
}

function WorkoutHistoryList({ date }: Props) {
  const start = new Date(date)
  start.setHours(0,0,0,0)
  const end = new Date(date)
  end.setHours(23, 59, 59, 999)

  const workouts = useQuery(api.workouts.listWithRepsForHistory, {
    start: start.getTime(),
    end: end.getTime()
  });

  function onRepEntryPressed(entryId: string) {
    router.push(`/edit-entry/${entryId}`)
  }

  if(!workouts) {
    return <ActivityIndicator size="large" />
  }

  return (
    <>
      {workouts.map(wo =>
        <ThemedView key={wo._id} style={styles.stepContainer}>
          <ThemedText type="subtitle">{wo.name}</ThemedText>
          {!wo.loggedRepEntries ? <ThemedText> No reps logged. </ThemedText> : (
            <View style={styles.entryListWrapper}>
              {wo.loggedRepEntries.map((lre: any) => (
                <ListItem key={lre._id} onPress={() => onRepEntryPressed(lre._id)}>
                  <Text>{lre.reps} at {new Date(lre.timestamp).toLocaleTimeString()}</Text>
                </ListItem>
              ))}
            </View>
          )}
        </ThemedView>
      )}
    </>
  )
}

export default WorkoutHistoryList

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  dateNavRow: {
    gap: 8,
    marginBottom: 8,
    display: "flex",
    flexDirection: "row",
  },
  date: {
    flex: 1,
    alignItems: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  entryListWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 8
  }
});