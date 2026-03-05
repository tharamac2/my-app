import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function ChatScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Chat feature coming soon</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 20, fontWeight: 'bold' }
});
