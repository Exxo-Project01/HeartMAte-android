/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { Button } from 'react-native';

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


    import AudioRecorderPlayer from 'react-native-audio-recorder-player';


    var audioRecorderPlayer;
class  App extends React.Component {
  
  constructor(){
    super()

    this.state={
      recordSecs:0
    }
    audioRecorderPlayer =new AudioRecorderPlayer();

  }
  

  onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
      });
      return;
    });
    console.log(result);
  }
  
  onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log(result);
  }
  
  onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        console.log('finished');
        this.audioRecorderPlayer.stopPlayer();
      }
      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  }
  
  onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  }
  
  onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  }
 
render(){
  return (
    
  <View>
<Button
    onPress={this.onStartRecord}
    title="Start Recording"
    color="#841584"
    accessibilityLabel="Learn more about this purple button"
  />  
  <Button
    onPress={this.onStopRecord}
    title="Stop Recording"
    color="#841584"
    accessibilityLabel="Learn more about this purple button"
  /> 
  <Button
    onPress={this.onStartPlay}
    title="Start Playing"
    color="#841584"
    accessibilityLabel="Learn more about this purple button"
  /> 
  <Button
    onPress={this.onStopPlay}
    title="Stop Playing"
    color="#841584"
    accessibilityLabel="Learn more about this purple button"
  /> 
</View>
  );
};
}



export default App;
