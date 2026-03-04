import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DUMMY_CONVERSATIONS = [
    {
        id: '1',
        name: 'Priya Sharma',
        lastMessage: 'Hi, I saw your profile and...',
        time: '10:30 AM',
        unread: true,
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    },
    {
        id: '2',
        name: 'Anjali Desai',
        lastMessage: 'Would love to connect!',
        time: 'Yesterday',
        unread: false,
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    },
];

export default function MatchesScreen() {
    const theme = useColorScheme() ?? 'light';
    const colors = Colors[theme];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={DUMMY_CONVERSATIONS}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.chatRow, { borderBottomColor: colors.border }]}>
                        <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
                        <View style={styles.chatInfo}>
                            <View style={styles.chatHeader}>
                                <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
                                <Text style={[styles.time, { color: colors.textSecondary }]}>{item.time}</Text>
                            </View>
                            <View style={styles.messageRow}>
                                <Text
                                    style={[
                                        styles.lastMessage,
                                        { color: item.unread ? colors.text : colors.textSecondary },
                                        item.unread && styles.boldMessage
                                    ]}
                                    numberOfLines={1}
                                >
                                    {item.lastMessage}
                                </Text>
                                {item.unread && <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />}
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        padding: 16,
    },
    chatRow: {
        flexDirection: 'row',
        paddingVertical: 16,
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    chatInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
    },
    time: {
        fontSize: 12,
    },
    messageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        fontSize: 14,
        flex: 1,
        marginRight: 8,
    },
    boldMessage: {
        fontWeight: 'bold',
    },
    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
});
