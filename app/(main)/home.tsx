import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Page d'accueil
      </Text>
      <Text style={{ fontSize: 16, marginTop: 20, textAlign: 'center' }}>
        Bienvenue dans les laboratoires React Native !
      </Text>
    </View>
  );
}
