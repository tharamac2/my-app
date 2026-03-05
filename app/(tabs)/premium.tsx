import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function PremiumScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Premium feature coming soon</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 20, fontWeight: 'bold' }
});
