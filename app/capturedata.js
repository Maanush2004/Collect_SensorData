import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import { styles } from './sensordata';

export default function captureData() {

    const [accelData, setAccelData] = useState({
        x: 0,
        y: 0,
        z: 0,
      });
      
    const [accelSubscription, setAccelSubscription] = useState(null);
    
    const [gyroData, setGyroData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const [gyroSubscription, setGyroSubscription] = useState(null);

    const _subscribe = () => {
        setAccelSubscription(Accelerometer.addListener(setAccelData));
        setGyroSubscription(Gyroscope.addListener(setGyroData));
    };
    
    const _unsubscribe = () => {
        accelSubscription && accelSubscription.remove();
        setAccelSubscription(null);
        gyroSubscription && gyroSubscription.remove();
        setGyroSubscription(null);        
    };
    
    const [capture,setCapture] = useState(false)

    const handleToggle = () => {
        if (capture) {
            _unsubscribe()
            setVisibility(!visibility)
        } else {
            _subscribe()
        }
        setCapture(!capture)
    }

    const handleCancel = () => {
        setLabel("")
        setVisibility(!visibility)
    }

    const handleSave = () => {
        if (label === "") alert("Empty label not allowed")
        storeData(JSON.stringify({[label]:reading}))
        setLabel("")
        setReading([])
        setCount(0)
        setVisibility(!visibility)
    }

    const [reading,setReading] = useState([])

    const [count,setCount] = useState(0)

    const [visibility,setVisibility] = useState(false)

    const [label,setLabel] = useState("")

    const storeData = async (value) => {
        await AsyncStorage.setItem(Date.now().toString(), value);
    }

    useEffect(() => {
        if (capture) {
            setCount(count+1)
            setReading((prevReading) => [...prevReading, {[count]: {accelerometer: accelData, gyroscope: gyroData}}])
        }
    }, [accelData,gyroData]);    

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Capture Data'
                }}
            />
            <View style={{position:"absolute", top:"50%", left:"50%"}}>
              <TouchableOpacity style={styles.button} onPress={handleToggle}>
                <Text>{capture ? "Stop" : "Start"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Dialog.Container visible={visibility}>
                  <Dialog.Title>Save Data</Dialog.Title>
                  <Dialog.Description>
                    Enter the label
                  </Dialog.Description>
                  <Dialog.Input onChangeText={txt => setLabel(txt)}/>
                  <Dialog.Button label="Cancel" onPress={handleCancel} />
                  <Dialog.Button label="Save" onPress={handleSave} />
                </Dialog.Container>
            </View>
        </View>
    );
}