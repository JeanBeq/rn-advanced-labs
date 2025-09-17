import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Page d'accueil
      </Text>
      <Text style={{ fontSize: 16, marginTop: 20, textAlign: 'center' }}>
        Bienvenue dans les laboratoires React Native !
      </Text>
      <Link href="/detail/4458">
        <Text style={{ fontSize: 16, marginTop: 20, textAlign: 'center', color: 'blue' }}>
          Voir les détails de l'élément 4458
        </Text>
      </Link>
      <Link href="/detail/123">
        <Text style={{ fontSize: 16, marginTop: 20, textAlign: 'center', color: 'blue' }}>
          Voir les détails de l'élément 123
        </Text>
      </Link>
      <Link href="/detail/abc">
        <Text style={{ fontSize: 16, marginTop: 20, textAlign: 'center', color: 'blue' }}>
          Voir les détails de l'élément abc
        </Text>
      </Link>
    </View>
  );
}
