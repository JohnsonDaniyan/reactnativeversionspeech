import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice'
import {Entypo} from '@expo/vector-icons';

export default function App() {
  let [started, setStarted] = useState(false);
  let [result, setResult] = useState([]);

  useEffect(()=>{
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return()=>{
      Voice.destroy().then(Voice.removeAllListeners);
    }
  },[]);

  const startSpeechToText = async ()=>{
    await Voice.start("en-US");
    setStarted(true);
  };

  const stopSpeechToText = async ()=>{
    await Voice.stop("en-US");
    setStarted(false);
  };

  const onSpeechResults = (result)=>{
    setResult(result.value);
  }
  const onSpeechError = (result)=>{
    console.log(result.error);
  }

  return (
    <View style={styles.container}>
      <View style={styles.indicator}>
        <Text style={styles.indicatorText}>Microphone: OFF</Text>
      </View>
      {result.map((result,index)=>{
        <Text key={index}>{result}</Text>
      })}
      <Text>Research For Impact (R4I)</Text> 
      <Text style={styles.title}>Vibrotactile Morse
Code Application </Text>
        <View style={styles.mid}>
          <Text>Tap anywhere on the</Text>
          <Entypo name="tablet" size={30} color="white" />
          <Text>screen to enable Microphone</Text>
          <Entypo name="mic" size={30} color="white" />
        </View>
        <View style={styles.microphone}>
          {!started?<Button title='Start STT' onPress={startSpeechToText}></Button>:undefined}
          {started?<Button title='Stop STT' onPress={stopSpeechToText}></Button>:undefined}
          <Text><Entypo name="mic" size={100} color="lightgrey" /></Text>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingTop:'20%',
    paddingBottom:'20%',
    boxSizing: 'border-box',
    margin:'10%',
    textAlign: 'center',
  },
  title:{
    fontSize:"35px",
    fontWeight:"bold"
  },
  microphone:{
    borderWidth:"10px",
    borderColor:"lightgrey",
    backgroundColor:"white",
    borderRadius:"50%",
    padding:"10%",
  },
  mid:{
    borderWidth:"10px",
    borderColor:"#F6F6F6",
    borderRadius:"5%",
    paddingHorizontal:"10%",
    paddingVertical:"5%",
    backgroundColor:"#F6F6F6",
    margin:"10%"
  },
  midIcon:{
    width:"fit-content",
    marginHorizontal:"auto",
    backgroundColor:"#838383",
    padding:"3%",
    borderRadius:"10%",
    marginVertical:"10%"
  },
  indicator:{
    backgroundColor:"#EF4444",
    padding:"3%",
  },
  indicatorText:{
    color:"white",
  }
});
