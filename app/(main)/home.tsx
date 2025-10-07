import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Page d'accueil
      </Text>
      <Text style={styles.subtitle}>
        Bienvenue dans les laboratoires React Native !
      </Text>
      
      {/* Section TP3 - Formulaires */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TP3 - Formulaires avancés</Text>
        <Link href="/TP3-forms/formik" style={styles.linkContainer}>
          <Text style={styles.linkText}>
            📝 Formulaire avec Formik + Yup
          </Text>
        </Link>
        <Link href="/TP3-forms/rhf" style={styles.linkContainer}>
          <Text style={styles.linkText}>
            🎯 Formulaire avec React Hook Form + Zod
          </Text>
        </Link>
      </View>

      {/* Section TP4 - Robots */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TP4 - CRUD Robots</Text>
        <Link href="/tp4A-robots" style={styles.linkContainer}>
          <Text style={styles.linkText}>
            🤖 Gestionnaire Robots (Zustand)
          </Text>
        </Link>
        <Link href="/tp4b-robots-rtk" style={[styles.linkContainer, { backgroundColor: '#8B5CF6' }]}>
          <Text style={styles.linkText}>
            🔧 Gestionnaire Robots (Redux Toolkit)
          </Text>
        </Link>
      </View>

      {/* Section TP5 - Base de données SQLite */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TP5 - Base de données SQLite</Text>
        <Link href="/TP5-robots-db" style={[styles.linkContainer, { backgroundColor: '#10B981' }]}>
          <Text style={styles.linkText}>
            💾 Robots Offline (SQLite)
          </Text>
        </Link>
      </View>

      {/* Section Navigation existante */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Navigation (TP2)</Text>
        <Link href="/detail/4458" style={styles.linkContainer}>
          <Text style={styles.linkText}>
            Voir les détails de l'élément 4458
          </Text>
        </Link>
        <Link href="/detail/123" style={styles.linkContainer}>
          <Text style={styles.linkText}>
            Voir les détails de l'élément 123
          </Text>
        </Link>
        <Link href="/detail/abc" style={styles.linkContainer}>
          <Text style={styles.linkText}>
            Voir les détails de l'élément abc
          </Text>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  section: {
    marginBottom: 30,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  linkContainer: {
    marginVertical: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    minWidth: 280,
  },
  linkText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
  },
});
