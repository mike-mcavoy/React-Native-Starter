import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

const Book = () => {
  return <View className="h-60 w-40 bg-stone-500"></View>;
};

export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <Book />
      <StatusBar style="auto" />
    </View>
  );
}
