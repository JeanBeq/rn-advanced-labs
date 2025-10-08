import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>React Native Labs</Text>
        <Text style={styles.subtitle}>Mes travaux pratiques</Text>
      </View>

      {/* Modules List */}
      <View style={styles.list}>
        <Link href="/tp1-profile-card" asChild>
          <Pressable style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.icon}>👤</Text>
              <Text style={styles.itemTitle}>TP1 - Profil</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Link>

        <Link href="/TP3-forms/formik" asChild>
          <Pressable style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.icon}>📝</Text>
              <Text style={styles.itemTitle}>TP3 - Formulaires</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Link>

        <Link href="/tp4A-robots" asChild>
          <Pressable style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.icon}>🤖</Text>
              <Text style={styles.itemTitle}>TP4A - Zustand</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Link>

        <Link href="/tp4b-robots-rtk" asChild>
          <Pressable style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.icon}>🔧</Text>
              <Text style={styles.itemTitle}>TP4B - Redux</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Link>

        <Link href="/TP5-robots-db" asChild>
          <Pressable style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.icon}>💾</Text>
              <Text style={styles.itemTitle}>TP5 - SQLite</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Link>

        <Link href="/TP6-camera" asChild>
          <Pressable style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.icon}>📹</Text>
              <Text style={styles.itemTitle}>TP6 - Caméra</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 60,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  list: {
    padding: 16,
    gap: 12,
  },
  item: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  icon: {
    fontSize: 32,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  arrow: {
    fontSize: 28,
    color: '#999',
    fontWeight: '300',
  },
});
