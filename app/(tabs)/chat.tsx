import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const serifFont = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});

// Mock data based on the design image
const MESSAGES = [
    {
        id: '1',
        name: 'kaviya',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop',
        lastMessage: 'sticker 😊',
        time: '22 min',
        unread: 1,
    },
    {
        id: '2',
        name: 'Selvi',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop',
        lastMessage: 'How are you?',
        time: '22 min',
        unread: 2,
    },
    {
        id: '3',
        name: 'Riya Shibu',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop',
        lastMessage: 'Hello?',
        time: '47 min',
        unread: 0,
    },
    {
        id: '4',
        name: 'jannu',
        imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop',
        lastMessage: 'Ok bye....',
        time: '56 min',
        unread: 0,
    },
    {
        id: '5',
        name: 'Ramya',
        imageUrl: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=1000&auto=format&fit=crop',
        lastMessage: 'Mmm',
        time: '1 Hour',
        unread: 0,
    },
    {
        id: '6',
        name: 'kavi',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop',
        lastMessage: 'what are you doing ?',
        time: '2 Hour',
        unread: 0,
    },
    {
        id: '7',
        name: 'Riya Shibu',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop',
        lastMessage: 'Hello?',
        time: '47 min',
        unread: 0,
    },
];

export default function ChatScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const renderMessageItem = ({ item }: { item: typeof MESSAGES[0] }) => (
        <TouchableOpacity
            style={styles.messageItem}
            onPress={() => router.push({
                pathname: '/chat-detail',
                params: { name: item.name, imageUrl: item.imageUrl }
            })}
        >
            <View style={styles.avatarBorder}>
                <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
            </View>

            <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                    <Text style={styles.senderName}>{item.name}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
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

            <FlatList
                data={MESSAGES.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                renderItem={renderMessageItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
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
