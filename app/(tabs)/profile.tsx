import { Colors } from '@/constants/theme';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { logout } from '@/store/userSlice';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={[styles.title, { color: theme.text }]}>Hello, {user.email}</Text>
      <TouchableOpacity onPress={() => dispatch(logout())}>
        <Text style={styles.logout}>Log out</Text>
      </TouchableOpacity>
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

  logout: {
    color: 'white',
    backgroundColor: '#0a7f3b',
    textAlign: 'center',
    padding: 16,
    fontSize: 20,
    borderRadius: 8,
  },
});
