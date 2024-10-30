import { Stack, useNavigation } from 'expo-router';
import { Button, Text, View, StyleSheet } from 'react-native';

export default function Home() {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Home'
          }}
        />
        <Button
                onPress={() =>
                    navigation.navigate('sensordata')
                }
                title="Live Sensor Data"
        />
        <Button
                onPress={() =>
                    navigation.navigate('capturedata')
                }
                title="Capture Sensor Data"
        />
        <Button
                onPress={() =>
                    navigation.navigate('exportdata')
                }
                title="Export Data"
        />
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
});