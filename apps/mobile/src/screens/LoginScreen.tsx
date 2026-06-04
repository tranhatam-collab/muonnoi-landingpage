import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { colors } from '../theme/colors';

export function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);

  async function handleMagicLink() {
    if (!email.includes('@')) {
      Alert.alert('Lỗi', 'Vui lòng nhập email hợp lệ');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://api.muonnoi.org/api/auth/magic-link/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) {
        Alert.alert('Đã gửi', 'Kiểm tra email để đăng nhập');
      } else {
        Alert.alert('Lỗi', data.message || 'Không thể gửi magic link');
      }
    } catch (e) {
      Alert.alert('Lỗi', 'Kết nối thất bại');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Muon Nơi</Text>
      <Text style={styles.subtitle}>Hệ điều hành xã hội số</Text>

      <TextInput
        style={styles.input}
        placeholder="Email của bạn"
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleMagicLink} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Đang gửi...' : 'Gửi link đăng nhập'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondary]}
        onPress={() => {
          setUser({ id: 'guest', name: 'Khách', email: '' });
          navigation.replace('Home');
        }}
      >
        <Text style={[styles.buttonText, styles.secondaryText]}>Chơi không đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: colors.bg },
  title: { fontSize: 32, fontWeight: '700', color: colors.text, marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 14, color: colors.muted, marginBottom: 32, textAlign: 'center' },
  input: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    color: colors.text,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  secondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
  secondaryText: { color: colors.muted },
});
