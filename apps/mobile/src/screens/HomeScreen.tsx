import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { colors } from '../theme/colors';

export function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.clearUser);

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <View style={styles.header}>
        <Text style={styles.greeting}>Chào, {user?.name || 'Khách'}</Text>
        <Text style={styles.subtitle}>Muon Nơi — Hệ điều hành xã hội số</Text>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Plays</Text>
          <Text style={styles.cardDesc}>100 trò chơi không thắng được</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Làm việc</Text>
          <Text style={styles.cardDesc}>Tìm việc, đăng việc, không phí ẩn</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Du lịch</Text>
          <Text style={styles.cardDesc}>Local Host, chứng thực thật</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Cộng đồng</Text>
          <Text style={styles.cardDesc}>Người Việt Muôn Nơi</Text>
        </TouchableOpacity>
      </View>

      {user?.id !== 'guest' && (
        <TouchableOpacity style={styles.logout} onPress={clearUser}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { padding: 24, paddingTop: 48 },
  greeting: { fontSize: 24, fontWeight: '700', color: colors.text, marginBottom: 4 },
  subtitle: { fontSize: 13, color: colors.muted },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12 },
  card: {
    width: '47%',
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 15, fontWeight: '600', color: colors.text, marginBottom: 4 },
  cardDesc: { fontSize: 12, color: colors.muted },
  logout: { margin: 24, padding: 14, borderRadius: 8, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  logoutText: { color: colors.muted, fontWeight: '500' },
});
