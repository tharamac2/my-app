import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../services/api';
import { SkeletonList } from '@/components/SkeletonLoader';

const { width, height } = Dimensions.get('window');

const serifFont = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});

export default function AllMatchesScreen() {
    const router = useRouter();
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await api.get('/discovery/feed');
                setMatches(response.data.feed);
            } catch (error) {
                console.error('Failed to load matches:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMatches();
    }, []);

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const response = await api.get('/discovery/feed');
            setMatches(response.data.feed);
        } catch (error) {
            console.error('Refresh failed:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const handleAction = async (targetId: string, action: string) => {
        try {
            await api.post('/matches/action', { target_id: parseInt(targetId), action });
            // Optionally, we could remove them from the list if they are liked/passed
        } catch (e) {
            console.error('Action failed:', e);
        }
    };

    const renderMatchCard = ({ item }: { item: any }) => (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push({
                pathname: '/profile-detail',
                params: { id: item.id.toString() }
            })}
            activeOpacity={0.9}
        >
            <Image source={{ uri: item.photo_url || 'https://via.placeholder.com/400' }} style={styles.cardImage} />

            {/* Side Action Buttons */}
            <View style={styles.sideActions}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => handleAction(item.id.toString(), 'like')}>
                    <Ionicons name="heart" size={24} color="#FDBE01" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                    <MaterialCommunityIcons name="ring" size={24} color="#FDBE01" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => router.push({
                        pathname: '/chat-detail',
                        params: { name: item.full_name, imageUrl: item.photo_url }
                    })}
                >
                    <Ionicons name="chatbubble" size={24} color="#FDBE01" />
                </TouchableOpacity>
            </View>

            {/* Bottom Info Overlay */}
            <View style={styles.infoOverlay}>
                <Text style={styles.nameText}>{item.full_name}, {item.age || '-'}</Text>
                <Text style={styles.professionText}>{item.profession || 'Professional'} - {item.education || ''}</Text>
                <Text style={styles.locationText}>{item.location}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={28} color="#FDBE01" />
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={{flex: 1, padding: 20 }}>
                    <SkeletonList count={3} />
                </View>
            ) : (
                <FlatList
                    data={matches}
                    renderItem={renderMatchCard}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#FDBE01']} />}
                    ListEmptyComponent={
                        <View style={{ alignItems: 'center', marginTop: 50 }}>
                            <Text style={{ fontFamily: serifFont, color: '#666' }}>No new matches found in your location.</Text>
                        </View>
                    }
                />
            )}

            {/* Floating Bottom Tab Bar Mockup */}
            <View style={styles.bottomTab}>
                <TouchableOpacity onPress={() => router.push('/(tabs)')}>
                    <Ionicons name="home-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/(tabs)/chat')}>
                    <Ionicons name="chatbubble-ellipses-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/(tabs)/matches')}>
                    <Ionicons name="heart-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/(tabs)/premium')}>
                    <MaterialCommunityIcons name="crown-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
                    <Ionicons name="person-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    backBtn: {
        padding: 5,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    card: {
        width: '100%',
        height: height * 0.55,
        borderRadius: 25,
        overflow: 'hidden',
        marginBottom: 20,
        position: 'relative',
        backgroundColor: '#F5F5F5',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    sideActions: {
        position: 'absolute',
        right: 15,
        top: '15%',
        gap: 20,
    },
    actionBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingTop: 40,
        backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
        // backgroundColor: 'rgba(0,0,0,0.3)', // Fallback
    },
    nameText: {
        fontSize: 22,
        fontFamily: serifFont,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    professionText: {
        fontSize: 14,
        color: '#FFFFFF',
        opacity: 0.9,
        marginBottom: 2,
        fontFamily: serifFont,
    },
    locationText: {
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: '600',
        fontFamily: serifFont,
    },
    bottomTab: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        height: 70,
        backgroundColor: '#FDBE01',
        borderRadius: 35,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
});
