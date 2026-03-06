import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
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

// Dummy Data for different segments
const PENDING_REQUESTS = [
    {
        id: 'p1',
        name: 'Rohan Sharma',
        age: 29,
        details: 'Software Engineer • Bangalore',
        matchPercentage: 88,
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop',
    },
    {
        id: 'p2',
        name: 'Arjun Verma',
        age: 31,
        details: 'Doctor • Mumbai',
        matchPercentage: 72,
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop',
    },
];

const ACCEPTED_MATCHES = [
    {
        id: 'a1',
        name: 'Vikram Singh',
        age: 30,
        details: 'Entrepreneur • Delhi',
        matchPercentage: 92,
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop',
    },
];

const MUTUAL_MATCHES = [
    {
        id: 'm1',
        name: 'Siddharth Rao',
        age: 28,
        details: 'Architect • Chennai',
        matchPercentage: 95,
        imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop',
    },
];

type TabType = 'Pending' | 'Accepted' | 'Mutual';

export default function MatchesScreen() {
    const [activeTab, setActiveTab] = useState<TabType>('Pending');

    const getActiveData = () => {
        switch (activeTab) {
            case 'Accepted': return ACCEPTED_MATCHES;
            case 'Mutual': return MUTUAL_MATCHES;
            case 'Pending':
            default: return PENDING_REQUESTS;
        }
    };

    const renderMatchCard = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Image source={{ uri: item.imageUrl }} style={styles.avatar} />

                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item.name}, {item.age}</Text>
                    <Text style={styles.details}>{item.details}</Text>

                    <View style={styles.compatibilityTag}>
                        <Ionicons name="sparkles" size={14} color="#FDBE01" />
                        <Text style={styles.compatibilityText}>{item.matchPercentage}% Match</Text>
                    </View>
                </View>
            </View>

            <View style={styles.actionRow}>
                {activeTab === 'Pending' ? (
                    <>
                        <TouchableOpacity style={[styles.actionBtn, styles.declineBtn]}>
                            <Ionicons name="close" size={20} color="#666" />
                            <Text style={styles.declineText}>Decline</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionBtn, styles.acceptBtn]}>
                            <Ionicons name="checkmark" size={20} color="#1A1A1A" />
                            <Text style={styles.acceptText}>Accept</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity style={[styles.actionBtn, styles.messageBtn]}>
                        <Ionicons name="chatbubble-ellipses" size={20} color="#1A1A1A" />
                        <Text style={styles.acceptText}>Send Message</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Matches</Text>
            </View>

            {/* Segmented Control */}
            <View style={styles.segmentedControl}>
                {(['Pending', 'Accepted', 'Mutual'] as TabType[]).map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.segmentBtn, activeTab === tab && styles.segmentBtnActive]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.segmentText, activeTab === tab && styles.segmentTextActive]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Matches List */}
            <FlatList
                data={getActiveData()}
                keyExtractor={item => item.id}
                renderItem={renderMatchCard}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="heart-dislike-outline" size={48} color="#CCC" />
                        <Text style={styles.emptyText}>No {activeTab.toLowerCase()} matches yet.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 28,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 25,
        padding: 4,
    },
    segmentBtn: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 21,
    },
    segmentBtnActive: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    segmentText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666666',
    },
    segmentTextActive: {
        color: '#1A1A1A',
        fontWeight: 'bold',
    },
    listContent: {
        padding: 20,
        paddingBottom: 40,
        gap: 15,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    cardContent: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    details: {
        fontSize: 13,
        color: '#666666',
        marginBottom: 8,
    },
    compatibilityTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    compatibilityText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#F9A825',
        marginLeft: 4,
    },
    actionRow: {
        flexDirection: 'row',
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingTop: 16,
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 25,
        borderWidth: 1,
    },
    declineBtn: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E0E0E0',
    },
    declineText: {
        color: '#666666',
        fontWeight: '600',
        marginLeft: 6,
    },
    acceptBtn: {
        backgroundColor: '#FDBE01',
        borderColor: '#FDBE01',
    },
    acceptText: {
        color: '#1A1A1A',
        fontWeight: 'bold',
        marginLeft: 6,
    },
    messageBtn: {
        backgroundColor: '#FDBE01',
        borderColor: '#FDBE01',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        marginTop: 12,
    },
});
