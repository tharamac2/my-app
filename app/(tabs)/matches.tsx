import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {
    Dimensions,
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const serifFont = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});

type TabType = 'Pending' | 'Mutual' | 'Sent';

export default function FavouritesScreen() {
    const [activeTab, setActiveTab] = useState<TabType>('Pending');
    const [pendingItems, setPendingItems] = useState<any[]>([]);
    const [mutualItems, setMutualItems] = useState<any[]>([]);
    const [sentItems, setSentItems] = useState<any[]>([]);
    const router = useRouter();

    const fetchMatches = async () => {
        try {
            const response = await api.get('/matches/');
            setPendingItems(response.data.liked_you || []);
            setMutualItems(response.data.mutual || []);
            setSentItems(response.data.your_likes || []);
        } catch (error) {
            console.error("Failed to fetch matches:", error);
        }
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    const handleMatchAction = async (targetId: number, action: string) => {
        try {
            await api.post('/matches/action', { target_id: targetId, action });
            fetchMatches(); // Refresh list after action
        } catch (error) {
            console.error("Match action failed:", error);
        }
    };

    const handleMessageAction = (item: any) => {
        router.push({
            pathname: '/chat-detail',
            params: { name: item.full_name, imageUrl: item.photo_url || 'https://via.placeholder.com/150' }
        });
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.photo_url || 'https://via.placeholder.com/150' }} style={styles.image} />
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.nameText}>{item.full_name}</Text>
                <View style={styles.statsRow}>
                    {item.location ? <Text style={styles.statsText}>{item.location}</Text> : null}
                </View>
                <Text style={styles.professionText}>{item.profession || 'Professional'}</Text>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.profileBtn}
                        onPress={() => router.push({
                            pathname: '/profile-detail',
                            params: { name: item.full_name }
                        })}
                    >
                        <Text style={styles.profileBtnText}>profile</Text>
                    </TouchableOpacity>
                    
                    {activeTab === 'Mutual' && (
                        <TouchableOpacity style={styles.messageBtn} onPress={() => handleMessageAction(item)}>
                            <Text style={styles.messageBtnText}>Message</Text>
                        </TouchableOpacity>
                    )}
                    
                    {activeTab === 'Pending' && (
                        <>
                            <TouchableOpacity style={[styles.messageBtn, {backgroundColor: '#E8F5E9', borderColor: '#C8E6C9'}]} onPress={() => handleMatchAction(item.partner_id, 'like')}>
                                <Text style={[styles.messageBtnText, {color: '#2E7D32'}]}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.messageBtn, {backgroundColor: '#FFEBEE', borderColor: '#FFCDD2'}]} onPress={() => handleMatchAction(item.partner_id, 'pass')}>
                                <Text style={[styles.messageBtnText, {color: '#C62828'}]}>Decline</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="#FDBE01" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Favourites</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    onPress={() => setActiveTab('Pending')}
                    style={[styles.tabItem, activeTab === 'Pending' && styles.tabItemActive]}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'Pending' ? styles.tabTextActive : styles.tabTextInactive
                    ]}>
                        Pending
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('Mutual')}
                    style={[styles.tabItem, activeTab === 'Mutual' && styles.tabItemActive]}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'Mutual' ? styles.tabTextActive : styles.tabTextInactive
                    ]}>
                        Mutual
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('Sent')}
                    style={[styles.tabItem, activeTab === 'Sent' && styles.tabItemActive]}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'Sent' ? styles.tabTextActive : styles.tabTextInactive
                    ]}>
                        Sent
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={activeTab === 'Pending' ? pendingItems : activeTab === 'Mutual' ? mutualItems : sentItems}
                keyExtractor={item => item.match_id?.toString() || item.partner_id?.toString()}
                renderItem={renderItem}
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
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 15,
        padding: 5,
        zIndex: 1,
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: serifFont,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    tabItem: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabItemActive: {
        borderBottomColor: '#FDBE01',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
    },
    tabTextActive: {
        color: '#FDBE01',
    },
    tabTextInactive: {
        color: '#999999',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    card: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FDBE01',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    infoContainer: {
        flex: 1,
        marginLeft: 15,
    },
    nameText: {
        fontSize: 16,
        fontFamily: serifFont,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 2,
    },
    statsRow: {
        flexDirection: 'row',
        marginBottom: 2,
        flexWrap: 'wrap',
    },
    statsText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#666666',
    },
    professionText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#666666',
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
    },
    profileBtn: {
        backgroundColor: '#FDBE01',
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
        alignItems: 'center',
    },
    profileBtnText: {
        color: '#1A1A1A',
        fontSize: 13,
        fontWeight: '700',
    },
    messageBtn: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'center',
    },
    messageBtnText: {
        color: '#1A1A1A',
        fontSize: 13,
        fontWeight: '700',
    },
});
