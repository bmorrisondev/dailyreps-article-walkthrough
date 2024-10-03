import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import Button from '@/components/Button';
import WorkoutHistoryList from '@/components/WorkoutHistoryList';

export default function History() {
  const [date, setDate] = React.useState(new Date())

  function onPreviousDatePressed() {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    setDate(d)
  }

  function onNextDatePressed() {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    setDate(d)
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="calendar-outline" style={styles.headerImage} />}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Workout history</ThemedText>
        </ThemedView>
        <ThemedView style={styles.dateNavRow}>
          <Button onPress={onPreviousDatePressed}>
            <Ionicons size={18} name="caret-back" />
          </Button>
          <Text style={styles.date}>{date.toLocaleDateString()}</Text>
          <Button
            onPress={onNextDatePressed}
            disabled={date.toLocaleDateString() === (new Date()).toLocaleDateString()}>
            <Ionicons size={18} name="caret-forward" />
          </Button>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <WorkoutHistoryList date={date} />
        </ThemedView>
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
  dateNavRow: {
    gap: 8,
    marginBottom: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  date: {
    flex: 1,
    alignItems: "center",
    display: "flex",
    fontSize: 18,
    fontWeight: "bold",
    padding: 4
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8
  },
});
