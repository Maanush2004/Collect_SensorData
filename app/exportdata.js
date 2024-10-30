import React from "react";
import { Button, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shareAsync } from 'expo-sharing';
import { cacheDirectory, deleteAsync, writeAsStringAsync } from 'expo-file-system';
import { Stack } from 'expo-router';
import { styles } from './sensordata';

export default function App() {

  const getAllKeys = async () => {
    let keys = []
    let readings = []
    keys = await AsyncStorage.getAllKeys()
    for (key of keys) {
      readings.push(JSON.parse(await AsyncStorage.getItem(key)))
    }
    handleShare(readings)
  }

  const clearAll = async () => {
    await AsyncStorage.clear()
    alert("Cleared Sensor Data")
  }

  const handleShare = async (readings) => {
    const jsonString = JSON.stringify(readings,null,2)

    if (jsonString != '[]') {
      const fileUri = `${cacheDirectory}data.json`
      await writeAsStringAsync(fileUri, jsonString)

      await shareAsync(fileUri)
      await deleteAsync(fileUri)
    } else {
      alert("No data to export")
    }
  }

  return (
    <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Export Data'
          }}
        />
      <Button title="Export Data" onPress={getAllKeys} />
      <Button title="Clear Sensor Data" onPress={clearAll} />
    </View>
  );
}
