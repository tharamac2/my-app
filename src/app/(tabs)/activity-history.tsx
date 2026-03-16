import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Platform, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const serifFont = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});

// Mock Data for the list until API is integrated deeply
const MOCK_ACTIVITY = [
   { id: '1', title: 'Profile Viewed', description: 'Rahul Sharma viewed your profile.', date: 'Today, 10:30 AM', icon: 'eye-outline', color: '#3B82F6' },
   { id: '2', title: 'Interest Sent', description: 'You sent an interest to Priya Patel.', date: 'Yesterday, 4:15 PM', icon: 'heart-outline', color: '#EC4899' },
   { id: '3', title: 'New Message', description: 'Arjun Singh sent you a message.', date: 'Mar 12, 11:20 AM', icon: 'chatbubble-outline', color: '#10B981' },
];

export default function ActivityHistoryScreen() {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    };

    const renderItem = ({ item }: { item: typeof MOCK_ACTIVITY[0] }) => (
        <View style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon as any} size={24} color={item.color} />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
            <FlatList
                data={MOCK_ACTIVITY}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#FDBE01']} />}
                ListEmptyComponent={<Text style={styles.emptyText}>No recent activity found.</Text>}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    listContainer: {
        padding: 20,
        paddingBottom: 100,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A1A1A',
        fontFamily: serifFont,
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 6,
    },
    date: {
        fontSize: 12,
        color: '#999',
        fontWeight: '500',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
        color: '#666',
        fontFamily: serifFont,
    }
});
