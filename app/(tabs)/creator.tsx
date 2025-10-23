import CameraInput from '@/components/camera-input';
import { Colors } from '@/constants/theme';
import { Product } from '@/types/Product';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CreatorError {
  title: string | null;
  price: string | null;
}

async function createProduct(newProduct: Product) {
  const response = await fetch('https://68f9ecd5ef8b2e621e7e1102.mockapi.io/api/v1/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  });

  if (!response.ok) throw new Error('Failed to create product');
  return response.json();
}

export default function CreatorScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState<CreatorError>({ title: null, price: null });
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      Alert.alert('Success', 'Product added successfully!');
      setTitle('');
      setPrice('');
    },
    onError: err => {
      Alert.alert('Error', err.message);
    },
  });

  const handleSave = () => {
    const newError: CreatorError = { title: null, price: null };
    if (!title) newError.title = 'Title is required';
    if (!price) newError.price = 'Price is required';

    setError(newError);
    if (newError.title || newError.price) return;

    const newProduct: Product = {
      id: String(Date.now()),
      title,
      price: price + ' грн.',
      img: 'https://duzyben.pl/hpeciai/727f05f35ea9697c1126af01af8e160e/pol_pl_NAPOJ-7UP-GAZ-330ML-PEPSI-PUSZ-1142_1_1.jpg',
    };

    mutate(newProduct);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={[styles.title, { color: theme.text }]}>Add New Product</Text>
      <TextInput
        onChangeText={newTitle => setTitle(newTitle)}
        value={title}
        placeholder="Type product title"
        style={[styles.input, { color: theme.text }]}
      />
      {error.title && <Text style={styles.errorText}>{error.title}</Text>}
      <TextInput
        onChangeText={newPrice => setPrice(newPrice)}
        value={price}
        placeholder="Type price in UAH"
        keyboardType="numeric"
        style={[styles.input, { color: theme.text }]}
      />
      {error.price && <Text style={styles.errorText}>{error.price}</Text>}
      <CameraInput />
      <TouchableOpacity onPress={handleSave} style={styles.button}>
        {isPending ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Save Product</Text>}
      </TouchableOpacity>
      {isError && <Text style={styles.errorText}>Something went wrong!</Text>}
    </SafeAreaView>
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0a7f3b',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});
