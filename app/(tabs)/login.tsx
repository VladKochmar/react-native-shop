import { Colors } from '@/constants/theme';
import { useAppDispatch } from '@/hooks/use-redux';
import { login } from '@/store/userSlice';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface LoginError {
  email: string | null;
  password: string | null;
}

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<LoginError>({ email: null, password: null });
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogin = () => {
    const newError: LoginError = { email: null, password: null };
    if (!email) newError.email = 'Email is required';
    if (!password) newError.password = 'Password is required';

    setError(newError);
    if (newError.email || newError.password) return;

    const newUser = {
      id: Date.now(),
      email,
    };

    dispatch(login(newUser));
    router.replace('/profile');
    setEmail('');
    setPassword('');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <Text style={[styles.title, { color: theme.text }]}>Log In</Text>
        <TextInput
          onChangeText={newEmail => setEmail(newEmail)}
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          style={[styles.input, { color: theme.text }]}
        />
        {error.email && <Text style={styles.errorText}>{error.email}</Text>}
        <TextInput
          onChangeText={newPassword => setPassword(newPassword)}
          value={password}
          placeholder="Enter your password"
          secureTextEntry
          autoComplete="password"
          textContentType="password"
          style={[styles.input, { color: theme.text }]}
        />
        {error.password && <Text style={styles.errorText}>{error.password}</Text>}
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
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
