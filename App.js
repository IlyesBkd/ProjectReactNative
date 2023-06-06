import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Ilyes</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Header() {
  return (
    <header>
      <h1 style={{fontSize: 24, fontWeight: 'bold'}}>Here are my boxes</h1>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{width: 100, height: 50, backgroundColor: '#2aa198', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <span>Cyan: #2aa198</span>
        </div>
        <div style={{width: 100, height: 50, backgroundColor: '#268bd2', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <span>Blue: #268bd2</span>
        </div>
        <div style={{width: 100, height: 50, backgroundColor: '#d33682', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <span>Magenta: #d33682</span>
        </div>
        <div style={{width: 100, height: 50, backgroundColor: '#cb4b16', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <span>Orange: #cb4b16</span>
        </div>
      </div>
    </header>
  );
}


