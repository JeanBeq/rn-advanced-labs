import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function DetailScreen() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const navigation = useNavigation();
    const router = useRouter();

    const handleBack = useCallback(() => {
        // Prefer native back stack if available
        // @ts-ignore navigation may have canGoBack in underlying stack
        if (navigation.canGoBack && navigation.canGoBack()) {
            // @ts-ignore
            navigation.goBack();
        } else {
            router.replace('/(main)/home' as any);
        }
    }, [navigation, router]);

    useEffect(() => {
        navigation.setOptions?.({
            title: id ? `Détail ${id}` : "Détail",
            headerShown: true,
            headerLeft: () => (
                <Pressable
                    onPress={handleBack}
                    accessibilityRole="button"
                    accessibilityLabel="Revenir à la page précédente"
                    style={({ pressed }) => ({ paddingHorizontal: 16, opacity: pressed ? 0.5 : 1 })}
                >
                    <Text style={styles.backText}>Retour</Text>
                </Pressable>
            ),
        });
    }, [id, navigation, handleBack]);

    return (
        <View style={styles.container}>
            <Text style={styles.idText}>{id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    idText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#333",
    },
    backText: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600'
    }
});