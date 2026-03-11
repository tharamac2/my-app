import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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

const LIKED_YOU = [
    {
        id: '1',
        name: 'Kalyani Priyadarshan',
        stats: '5.5',
        location: 'kerala, india',
        profession: 'Software Engineer',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop',
    },
    {
        id: '2',
        name: 'Vijaya lakshmi',
        stats: '5.5',
        location: 'Tamil Nadu, india',
        profession: 'Software Engineer',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop',
    },
    {
        id: '3',
        name: 'selvi',
        stats: '5.5',
        location: '',
        profession: 'Software Engineer',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop',
    },
    {
        id: '4',
        name: 'Kalyani',
        stats: '5.5',
        location: 'kerala, india',
        profession: 'Software Engineer',
        imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop',
    },
];

const YOUR_LIKE = [
    {
        id: 'y1',
        name: 'Aditi Rao',
        stats: '5.7',
        location: 'Hyderabad, india',
        profession: 'Lead Designer',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop',
    },
];

type TabType = 'liked you' | 'your like';

export default function FavouritesScreen() {
    const [activeTab, setActiveTab] = useState<TabType>('liked you');
    const router = useRouter();

    const renderItem = ({ item }: { item: typeof LIKED_YOU[0] }) => (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.nameText}>{item.name}</Text>
                <View style={styles.statsRow}>
                    <Text style={styles.statsText}>{item.stats}</Text>
                    {item.location ? <Text style={styles.statsText}>  {item.location}</Text> : null}
                </View>
                <Text style={styles.professionText}>{item.profession}</Text>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.profileBtn}
                        onPress={() => router.push({
                            pathname: '/profile-detail',
                            params: { name: item.name }
                        })}
                    >
                        <Text style={styles.profileBtnText}>profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.messageBtn}>
                        <Text style={styles.messageBtnText}>Message</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={30} color="#FDBE01" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Favourites</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    onPress={() => setActiveTab('liked you')}
                    style={styles.tabItem}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'liked you' ? styles.tabTextActive : styles.tabTextInactive
                    ]}>
                        liked you
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('your like')}
                    style={styles.tabItem}
                >
                    <Text style={[
                        styles.tabTextHeader,
                        activeTab === 'your like' ? styles.tabTextActiveHeader : styles.tabTextInactiveHeader
                    ]}>
                        your like
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={activeTab === 'liked you' ? LIKED_YOU : YOUR_LIKE}
                keyExtractor={item => item.id}
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
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 32,
        fontFamily: serifFont,
        fontWeight: '700',
        color: '#1A1A1A',
        textAlign: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginBottom: 30,
        marginTop: 10,
    },
    tabItem: {
        paddingVertical: 5,
    },
    tabText: {
        fontSize: 24,
        fontWeight: '700',
    },
    tabTextActive: {
        color: '#FDBE01',
    },
    tabTextInactive: {
        color: '#000000',
    },
    tabTextHeader: {
        fontSize: 24,
        fontFamily: serifFont,
        fontWeight: '700',
    },
    tabTextActiveHeader: {
        color: '#FDBE01',
    },
    tabTextInactiveHeader: {
        color: '#000000',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    card: {
        flexDirection: 'row',
        marginBottom: 35,
        alignItems: 'center',
    },
    imageContainer: {
        width: 170,
        height: 100,
        borderRadius: 15,
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
        marginLeft: 20,
    },
    nameText: {
        fontSize: 16,
        fontFamily: serifFont,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 4,
    },
    statsRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    statsText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000000',
    },
    professionText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 20,
    },
    profileBtn: {
        backgroundColor: '#FDBE01',
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 20,
        minWidth: 70,
        alignItems: 'center',
    },
    profileBtnText: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '700',
    },
    messageBtn: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000000',
        minWidth: 70,
        alignItems: 'center',
    },
    messageBtnText: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '700',
    },
});
