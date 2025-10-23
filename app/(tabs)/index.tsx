import ProductsList from '@/components/products-list';
import { Colors } from '@/constants/theme';
import { StyleSheet, Text, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <Text style={[styles.title, { color: theme.text }]}>Welcome to our shop!!!</Text>
        <ProductsList />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 16,
  },
});
