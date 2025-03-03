import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Bedtime from './Bedtime';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Bedtime />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1B1D',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
