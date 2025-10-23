import { useAppDispatch } from '@/hooks/use-redux';
import { addToCart, removeFromCart } from '@/store/cartSlice';
import { Product } from '@/types/Product';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductCardProps {
  product: Product;
  isAdded?: boolean;
}

export default function ProductCard({ product, isAdded }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handlePress = () => {
    if (isAdded) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
      Alert.alert('Success', 'Product added to cart');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.img }} alt={product.title} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{product.price}</Text>
      </View>
      <TouchableOpacity style={styles.cart} onPress={handlePress}>
        <Feather name={isAdded ? 'trash-2' : 'shopping-cart'} size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    padding: 12,
    alignItems: 'center',
    marginVertical: 8,
  },
  image: {
    width: 84,
    height: 84,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  price: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '700',
    color: '#0a7f3b',
  },
  cart: {
    padding: 8,
  },
});
