import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const serifFont = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});

type NotificationStatus = 'unread' | 'read' | 'all';

interface Notification {
    id: string;
    type: 'welcome' | 'request';
    title?: string;
    message: string;
    timestamp: string;
    imageUrl?: string;
    status: 'unread' | 'read';
}


const INITIAL_NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        type: 'request',
        message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        timestamp: 'Last Wednesday at 9.42 am',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop',
        status: 'unread',
    },
    {
        id: '2',
        type: 'welcome',
        title: 'Welcome ! user',
        message: 'Lorem Ipsum is simply dummy text of the',
        timestamp: 'Last monday at 9.42 am',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1061&auto=format&fit=crop',
        status: 'unread',
    },
    {
        id: '3',
        type: 'welcome',
        title: 'Welcome ! user',
        message: 'Lorem Ipsum is simply dummy text of the',
        timestamp: 'Last monday at 9.42 am',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop',
        status: 'unread',
    },
    {
        id: '4',
        type: 'welcome',
        title: 'Welcome ! user',
        message: 'Lorem Ipsum is simply dummy text of the',
        timestamp: 'Last monday at 9.42 am',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop',
        status: 'unread',
    },
    {
        id: '5',
        type: 'request',
        message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        timestamp: 'Last Wednesday at 9.42 am',
        imageUrl: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=1000&auto=format&fit=crop',
        status: 'unread',
    },
];

export default function NotificationsScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<NotificationStatus>('all');
    const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: 'read' } : n));
    };

    const filteredNotifications = notifications.filter(n => {
        if (activeTab === 'all') return true;
        return n.status === activeTab;
    });

    const handleConnect = (id: string) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, status: 'read', message: 'connected successfully' } : n
        ));
        // Simulate adding to interest page/navigation
        Alert.alert('Success', 'Profile added to Interest page!');
    };

    const handleWelcomeClick = (item: Notification) => {
        markAsRead(item.id);
        router.push({
            pathname: '/chat-detail',
            params: {
                name: 'System',
                message: 'Welcome message',
                imageUrl: item.imageUrl
            }
        });
    };

    const renderNotification = ({ item }: { item: Notification }) => (
        <TouchableOpacity
            style={styles.notificationItem}
            activeOpacity={0.7}
            onPress={() => item.type === 'welcome' ? handleWelcomeClick(item) : markAsRead(item.id)}
        >
            <View style={styles.avatarContainer}>
                {item.imageUrl ? (
                    <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
                ) : (
                    <View style={[styles.avatar, styles.placeholderAvatar]}>
                        <Ionicons name="notifications" size={24} color="#FDBE01" />
                    </View>
                )}
                {item.status === 'unread' && <View style={styles.unreadDot} />}
            </View>

            <View style={styles.contentContainer}>
                {item.type === 'welcome' && <Text style={styles.welcomeTitle}>{item.title}</Text>}
                <Text style={styles.messageText}>{item.message}</Text>

                {item.type === 'request' && item.message !== 'connected successfully' && (
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.actionBtn}
                            onPress={(e) => {
                                e.stopPropagation();
                                handleConnect(item.id);
                            }}
                        >
                            <Text style={styles.actionBtnText}>Connect</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionBtn, { marginLeft: 15 }]}>
                            <Text style={styles.actionBtnText}>cancel</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <Text style={styles.timestampText}>{item.timestamp}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={28} color="#FDBE01" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.tabBar}>
                {(['all', 'unread', 'read'] as NotificationStatus[]).map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {filteredNotifications.length > 0 ? (
                <FlatList
                    data={filteredNotifications}
                    renderItem={renderNotification}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No message</Text>
                </View>
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
    backBtn: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#000',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
        gap: 40,
    },
    tabItem: {
        paddingVertical: 5,
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
    },
    activeTabItem: {
        borderBottomColor: '#FDBE01',
    },
    tabText: {
        fontSize: 16,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#000',
        textTransform: 'capitalize',
    },
    activeTabText: {
        color: '#FDBE01',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    notificationItem: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    avatarContainer: {
        marginRight: 15,
        position: 'relative',
    },
    unreadDot: {
        position: 'absolute',
        top: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#FDBE01',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#FDBE01',
    },
    placeholderAvatar: {
        backgroundColor: '#FFF8E1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    welcomeTitle: {
        fontSize: 22,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    messageText: {
        fontSize: 14,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#000',
        lineHeight: 18,
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 10,
    },
    actionBtn: {
        backgroundColor: '#FDBE01',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 8,
    },
    actionBtnText: {
        fontSize: 14,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#000',
    },
    timestampText: {
        fontSize: 12,
        color: '#666',
        marginTop: 10,
        fontFamily: serifFont,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    emptyText: {
        fontSize: 28,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#000',
    },
});
