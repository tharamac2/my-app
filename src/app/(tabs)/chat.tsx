import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SkeletonList } from '@/components/SkeletonLoader';

const serifFont = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});

export default function ChatScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [messagesList, setMessagesList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            setLoading(true);
            const response = await api.get('/chat/conversations');
            setMessagesList(response.data.conversations || []);
        } catch (error) {
            console.error("Failed to fetch conversations:", error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const response = await api.get('/chat/conversations');
            setMessagesList(response.data.conversations || []);
        } finally {
            setRefreshing(false);
        }
    };

    const formatTime = (isoString: string) => {
        if (!isoString) return '';
        const d = new Date(isoString);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const renderMessageItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.messageItem}
            onPress={() => router.push({
                pathname: '/chat-detail',
                params: { name: item.name, imageUrl: item.imageUrl, matchId: item.match_id }
            })}
        >
            <View style={styles.avatarBorder}>
                <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
            </View>

            <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                    <Text style={styles.senderName}>{item.name}</Text>
                    <Text style={styles.timeText}>{formatTime(item.time)}</Text>
                </View>

                <View style={styles.messageFooter}>
                    <Text style={styles.lastMessage} numberOfLines={1}>
                        {item.lastMessage}
                    </Text>
                    {item.unread > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadCount}>{item.unread}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#FDBE01" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Message</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Search Bar - explicitly requested */}
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search messages..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {loading && !refreshing ? (
                <View style={{ flex: 1, padding: 20 }}>
                    <SkeletonList count={4} />
                </View>
            ) : (
                <FlatList
                    data={messagesList.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                    renderItem={renderMessageItem}
                    keyExtractor={item => item.match_id.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#FDBE01']} />}
                    ListEmptyComponent={
                        <View style={{ alignItems: 'center', marginTop: 50 }}>
                            <Text style={{ fontFamily: serifFont, color: '#666' }}>No messages found.</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: serifFont,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8E1', // Matching the theme's light yellow
        borderRadius: 25,
        height: 46,
        marginHorizontal: 20,
        marginBottom: 20,
        paddingHorizontal: 15,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontFamily: serifFont,
        fontSize: 15,
        color: '#1A1A1A',
        fontWeight: '600',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Account for bottom tab bar
    },
    messageItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        alignItems: 'center',
    },
    avatarBorder: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: '#FDBE01',
        padding: 3,
        marginRight: 15,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 32,
    },
    messageContent: {
        flex: 1,
    },
    messageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    senderName: {
        fontSize: 18,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#000000',
    },
    timeText: {
        fontSize: 12,
        fontFamily: serifFont,
        color: '#666',
        fontWeight: '600',
    },
    messageFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        fontSize: 14,
        fontFamily: serifFont,
        color: '#888',
        flex: 1,
        marginRight: 10,
        fontWeight: '600',
    },
    unreadBadge: {
        backgroundColor: '#FDBE01',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unreadCount: {
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
