import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DetailScreen() {
    const id = useLocalSearchParams().id;
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: `Détail de l'élément ${id}`,
            headerShown: true,
        });
    }, [id, navigation]);

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
});