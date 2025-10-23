import ProductCard from '@/components/product-card';
import { Colors } from '@/constants/theme';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { clearCart } from '@/store/cartSlice';
import { FlatList, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const { products } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <Text style={[styles.title, { color: theme.text }]}>Cart</Text>
        {products.length ? (
          <>
            <FlatList
              data={products}
              renderItem={({ item }) => (
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <View style={{ flex: 1 }}>
                    <ProductCard product={item} isAdded={true} />
                  </View>
                  <Text style={{ color: theme.text, fontWeight: 600, fontSize: 20 }}>x {item.quantity}</Text>
                </View>
              )}
              keyExtractor={product => product.id}
            />
            <TouchableOpacity onPress={() => dispatch(clearCart())}>
              <Text style={styles.clear}>Clear all</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={[styles.empty, { color: theme.text }]}>There are no products</Text>
        )}
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
  empty: {
    textAlign: 'center',
    fontSize: 20,
  },
  clear: {
    color: 'white',
    backgroundColor: '#0a7f3b',
    textAlign: 'center',
    padding: 16,
    fontSize: 20,
    borderRadius: 8,
  },
});
