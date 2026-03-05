import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
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

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.82;
const CARD_SPACING = 15;

const serifFont = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'serif',
});

const FILTER_CHIPS = ['New Matches', 'Nearby', 'Premium', 'Same Profession', 'Online Now'];

const DUMMY_TOP_MATCHES = [
  {
    id: '1',
    name: 'Prisha Mirha',
    age: 28,
    tags: ['📍 Chennai', '💼 Software Professional', '🎓 B.Tech', '🗣️ Tamil'],
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Aishwarya',
    age: 26,
    tags: ['📍 Bangalore', '💼 UX Designer', '🎓 B.Des', '🗣️ Kannada'],
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Diya Patel',
    age: 27,
    tags: ['📍 Mumbai', '💼 Architect', '🎓 M.Arch', '🗣️ Gujarati'],
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop',
  },
];

const DUMMY_PREFERENCES = [
  { id: 'p1', name: 'Kavya', age: 25, title: 'Doctor', location: 'Kochin', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop' },
  { id: 'p2', name: 'Nisha', age: 29, title: 'Teacher', location: 'Pune', imageUrl: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=1000&auto=format&fit=crop' },
];

const DUMMY_RECENT = [
  {
    id: 'r1',
    name: 'Riya Shibu',
    age: 26,
    profession: 'Software Professional ....',
    location: 'Chennai, Tamil Nadu',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop',
  },
  {
    id: 'r2',
    name: 'Anjali Desai',
    age: 27,
    profession: 'Architect',
    location: 'Delhi, India',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop',
  },
];

export default function DiscoverScreen() {
  const [activeFilter, setActiveFilter] = useState('New Matches');

  const renderTopMatch = ({ item, index }: { item: typeof DUMMY_TOP_MATCHES[0], index: number }) => (
    <View style={[styles.topMatchCard, { marginLeft: index === 0 ? 20 : 0 }]}>
      <Image source={{ uri: item.imageUrl }} style={styles.topMatchImage} />

      {/* Heart button */}
      <TouchableOpacity style={styles.heartBtn}>
        <Ionicons name="heart" size={24} color="#FDBE01" />
      </TouchableOpacity>

      {/* Profile Details Overlay */}
      <View style={styles.topMatchOverlay}>
        <View style={styles.overlayTextContainer}>
          <Text style={styles.topMatchName}>{item.name}, {item.age}</Text>

          <View style={styles.tagsContainer}>
            {item.tags.map((tag, i) => (
              <View key={i} style={styles.tagPill}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Inline CTAs integrated into the overlay bottom row */}
        <View style={styles.inlineCtaContainer}>
          <TouchableOpacity style={styles.inlineCtaBtn}>
            <Ionicons name="chatbubble-outline" size={20} color="#FFFFFF" />
            <Text style={styles.inlineCtaText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.inlineCtaBtn, styles.inlineCtaBtnPrimary]}>
            <MaterialCommunityIcons name="ring" size={20} color="#1A1A1A" />
            <Text style={[styles.inlineCtaText, { color: '#1A1A1A' }]}>Interest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1287&auto=format&fit=crop' }}
            style={styles.profilePic}
          />
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for your better half"
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={28} color="#1A1A1A" />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {FILTER_CHIPS.map(chip => (
              <TouchableOpacity
                key={chip}
                style={[styles.filterChip, activeFilter === chip && styles.filterChipActive]}
                onPress={() => setActiveFilter(chip)}
              >
                <Text style={[styles.filterChipText, activeFilter === chip && styles.filterChipTextActive]}>
                  {chip}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Top Matches Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Matches</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllTextMinimal}>More</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={DUMMY_TOP_MATCHES}
          renderItem={renderTopMatch}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + CARD_SPACING}
          decelerationRate="fast"
          contentContainerStyle={{ paddingRight: 20 }}
          ItemSeparatorComponent={() => <View style={{ width: CARD_SPACING }} />}
        />

        {/* Preferences Section - NEW */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Based on Preferences</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllTextMinimal}>More</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
          {DUMMY_PREFERENCES.map((item, index) => (
            <TouchableOpacity key={item.id} style={[styles.prefCard, index > 0 && { marginLeft: 15 }]}>
              <Image source={{ uri: item.imageUrl }} style={styles.prefImage} />
              <View style={styles.prefGradient}>
                <Text style={styles.prefName}>{item.name}, {item.age}</Text>
                <Text style={styles.prefDetails}>{item.title} • {item.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recently Viewed Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Viewed</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
          {DUMMY_RECENT.map((item, index) => (
            <View key={item.id} style={[styles.recentCard, index > 0 && { marginLeft: 15 }]}>
              <Image source={{ uri: item.imageUrl }} style={styles.recentImage} />
              <View style={styles.recentInfo}>
                <Text style={styles.recentName}>{item.name}, {item.age}</Text>
                <Text style={styles.recentDetails} numberOfLines={1}>{item.profession}</Text>
                <Text style={styles.recentLocation}>{item.location}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  profilePic: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#FDBE01',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    height: 44,
    marginHorizontal: 15,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: serifFont,
    fontSize: 14,
    color: '#1A1A1A',
  },
  notificationBtn: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FDBE01',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  filterContainer: {
    marginBottom: 10,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  filterChipActive: {
    backgroundColor: '#1A1A1A',
    borderColor: '#1A1A1A',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: serifFont,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  seeAllTextMinimal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FDBE01',
  },
  topMatchCard: {
    width: CARD_WIDTH,
    height: 440,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1A1A1A',
  },
  topMatchImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topMatchOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  overlayTextContainer: {
    marginBottom: 15,
  },
  topMatchName: {
    fontSize: 24,
    fontFamily: serifFont,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagPill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  inlineCtaContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  inlineCtaBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  inlineCtaBtnPrimary: {
    backgroundColor: '#FDBE01',
    borderColor: '#FDBE01',
  },
  inlineCtaText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 6,
  },
  prefCard: {
    width: 140,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  prefImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  prefGradient: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    padding: 10,
    paddingTop: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  prefName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  prefDetails: {
    color: '#ddd',
    fontSize: 11,
    marginTop: 2,
  },
  recentCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 10,
    width: 260,
    alignItems: 'center',
  },
  recentImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  recentInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  recentName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  recentDetails: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  recentLocation: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
  },
});
