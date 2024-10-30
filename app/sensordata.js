import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import { Stack } from 'expo-router';

export default function SensorData() {
  const [accelData, setAccelData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [accelSubscription, setAccelSubscription] = useState(null);

  const _accelSubscribe = () => {
    setAccelSubscription(Accelerometer.addListener(setAccelData));
  };

  const _accelUnsubscribe = () => {
    accelSubscription && accelSubscription.remove();
    setAccelSubscription(null);
  };

  const [gyroData, setGyroData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [gyroSubscription, setGyroSubscription] = useState(null);

  const _gyroSubscribe = () => {
    setGyroSubscription(Gyroscope.addListener(setGyroData));
  };

  const _gyroUnsubscribe = () => {
    gyroSubscription && gyroSubscription.remove();
    setGyroSubscription(null);
  };  

  useEffect(() => {
    _accelSubscribe();
    _gyroSubscribe();
    return () => {_accelUnsubscribe(); _gyroUnsubscribe();}
  }, []);

  return (
    <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Live Sensor Data'
          }}
        />
        <View style={{paddingBottom: 50}}>
            <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
            <Text style={styles.text}>x: {accelData.x.toFixed(3)}</Text>
            <Text style={styles.text}>y: {accelData.y.toFixed(3)}</Text>
            <Text style={styles.text}>z: {accelData.z.toFixed(3)}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={accelSubscription ? _accelUnsubscribe : _accelSubscribe} style={styles.button}>
                <Text>{accelSubscription ? 'Off Accelerometer' : 'On Accelerometer'}</Text>
              </TouchableOpacity>
            </View>
        </View>
        <View>
            <Text style={styles.text}>Gyroscope: </Text>
            <Text style={styles.text}>x: {gyroData.x.toFixed(3)}</Text>
            <Text style={styles.text}>y: {gyroData.y.toFixed(3)}</Text>
            <Text style={styles.text}>z: {gyroData.z.toFixed(3)}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={gyroSubscription ? _gyroUnsubscribe : _gyroSubscribe} style={styles.button}>
                <Text>{gyroSubscription ? 'Off Gyroscope' : 'On Gyroscope'}</Text>
              </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
    padding: 10,
  },
});
