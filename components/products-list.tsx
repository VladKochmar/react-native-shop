import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import ProductCard from './product-card';

async function fetchProducts() {
  const response = await fetch('https://68f9ecd5ef8b2e621e7e1102.mockapi.io/api/v1/products');
  if (!response.ok) throw new Error('Error fetching products');
  return response.json();
}

export default function ProductsList() {
  const { data, isLoading, error } = useQuery({ queryKey: ['products'], queryFn: fetchProducts, staleTime: 60000 * 3 });

  if (isLoading)
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  if (error) return <Text style={styles.error}>Error: {error.message}</Text>;

  return <FlatList data={data} renderItem={({ item }) => <ProductCard product={item} />} keyExtractor={product => product.id} />;
}

const styles = StyleSheet.create({
  error: {
    color: '#c62929ff',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
