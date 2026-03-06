import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Platform,
    ScrollView,
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

// Dummy Data
const NEW_MATCHES = [
    { id: 'n1', name: 'Maya', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop' },
    { id: 'n2', name: 'Nina', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop' },
    { id: 'n3', name: 'Priya', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop' },
    { id: 'n4', name: 'Sarah', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop' },
];

const MESSAGES = [
    {
        id: 'm1',
        name: 'Anjali Desai',
        imageUrl: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=1000&auto=format&fit=crop',
        lastMessage: 'Hi! Let me know when you are free to talk.',
        time: '10:30 AM',
        unread: 2,
        online: true,
    },
    {
        id: 'm2',
        name: 'Diya Patel',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop',
        lastMessage: 'I really liked your profile.',
        time: 'Yesterday',
        unread: 0,
        online: false,
    },
    {
        id: 'm3',
        name: 'Prisha Mirha',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop',
        lastMessage: 'Sounds good! See you then.',
        time: 'Mon',
        unread: 0,
        online: true,
    },
];

export default function ChatScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    const renderMessageItem = ({ item }: { item: typeof MESSAGES[0] }) => (
        <TouchableOpacity style={styles.messageItem}>
            <View style={styles.avatarContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
                {item.online && <View style={styles.onlineBadge} />}
            </View>

            <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                    <Text style={styles.senderName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                </View>

                <View style={styles.messageFooter}>
                    <Text style={[styles.lastMessage, item.unread > 0 && styles.lastMessageUnread]} numberOfLines={1}>
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
        <SafeAreaView style={styles.container}>
            {/* Search Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Messages</Text>
                <TouchableOpacity>
                    <Ionicons name="ellipsis-vertical" size={24} color="#1A1A1A" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search conversations..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* New Matches Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>New Matches</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.newMatchesScroll}>
                    {NEW_MATCHES.map((match) => (
                        <TouchableOpacity key={match.id} style={styles.newMatchItem}>
                            <Image source={{ uri: match.imageUrl }} style={styles.newMatchAvatar} />
                            <Text style={styles.newMatchName} numberOfLines={1}>{match.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Messages List */}
                <View style={styles.messagesContainer}>
                    <FlatList
                        data={MESSAGES}
                        renderItem={renderMessageItem}
                        keyExtractor={item => item.id}
                        scrollEnabled={false} // Since it's inside a ScrollView
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 15,
    },
    title: {
        fontSize: 28,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
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
    },
    sectionHeader: {
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    newMatchesScroll: {
        paddingHorizontal: 20,
        gap: 15,
        marginBottom: 25,
    },
    newMatchItem: {
        alignItems: 'center',
        width: 60,
    },
    newMatchAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#FDBE01',
        marginBottom: 8,
    },
    newMatchName: {
        fontSize: 12,
        color: '#1A1A1A',
        fontWeight: '500',
    },
    messagesContainer: {
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    messageItem: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 15,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    onlineBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#4CAF50',
        borderWidth: 2,
        borderColor: '#FFFFFF',
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
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A1A1A',
        flex: 1,
        marginRight: 10,
    },
    timeText: {
        fontSize: 12,
        color: '#999',
    },
    messageFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        fontSize: 14,
        color: '#666',
        flex: 1,
        marginRight: 10,
    },
    lastMessageUnread: {
        color: '#1A1A1A',
        fontWeight: '600',
    },
    unreadBadge: {
        backgroundColor: '#FDBE01',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    unreadCount: {
        color: '#1A1A1A',
        fontSize: 12,
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginLeft: 91, // Aligns with the text content, bypassing the avatar
    },
});
