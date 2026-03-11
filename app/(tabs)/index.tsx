import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
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
    profession: 'Software Professional',
    degree: 'Graduate',
    location: 'Dwaraka, New Delhi',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Aishwarya',
    age: 26,
    profession: 'UX Designer',
    degree: 'B.Des',
    location: 'Bangalore, India',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop',
  },
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

const SUBSCRIPTION_PLANS = [
  {
    id: 'sub1',
    name: 'Ratan Lite',
    price: '₹999',
    duration: '3 Months',
    benefits: ['Send 50 Interests', 'Unlock 10 Contacts', 'Basic Support'],
    color: '#E0E0E0',
    textColor: '#1A1A1A'
  },
  {
    id: 'sub2',
    name: 'Ratan Pro',
    price: '₹1999',
    duration: '6 Months',
    benefits: ['Send 150 Interests', 'Unlock 30 Contacts', 'Priority Support', 'Profile Highlighting'],
    color: '#FDBE01',
    textColor: '#1A1A1A'
  },
  {
    id: 'sub3',
    name: 'Ratan Elite',
    price: '₹3999',
    duration: '12 Months',
    benefits: ['Unlimited Interests', 'Unlock 100 Contacts', 'Relationship Manager', 'Top Visibility'],
    color: '#1A1A1A',
    textColor: '#FFFFFF'
  }
];

export default function DiscoverScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('New Matches');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [likedProfiles, setLikedProfiles] = useState<string[]>([]);

  const handleToggleLike = (id: string, e?: any) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setLikedProfiles(prev =>
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  React.useEffect(() => {
    // Show premium modal every time the app/screen is opened
    setShowPremiumModal(true);
  }, []);

  const renderTopMatch = ({ item }: { item: typeof DUMMY_TOP_MATCHES[0] }) => (
    <View style={styles.topMatchContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.topMatchCard}
        onPress={() => router.push({
          pathname: '/profile-detail',
          params: { name: item.name, age: item.age.toString() }
        })}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.topMatchImage} />

        {/* Heart icon overlay */}
        <TouchableOpacity
          style={styles.heartOverlay}
          onPress={(e) => handleToggleLike(item.id, e)}
        >
          <Ionicons
            name={likedProfiles.includes(item.id) ? "heart" : "heart-outline"}
            size={24}
            color="#FDBE01"
          />
        </TouchableOpacity>

        {/* Info overlay */}
        <View style={styles.topMatchInfoOverlay}>
          <Text style={styles.overlayName}>{item.name}, {item.age}</Text>
          <Text style={styles.overlayDetails}>{item.profession} - {item.degree}</Text>
          <Text style={styles.overlayLocation}>{item.location}</Text>
        </View>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push({
            pathname: '/chat-detail',
            params: { name: item.name, imageUrl: item.imageUrl }
          })}
        >
          <Ionicons name="chatbubble" size={20} color="#000" />
          <Text style={styles.actionBtnText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push('/matches')}
        >
          <MaterialCommunityIcons name="ring" size={20} color="#000" />
          <Text style={styles.actionBtnText}>Interest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header - Image 3 Style */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1287&auto=format&fit=crop' }}
              style={styles.profilePic}
            />
          </TouchableOpacity>

          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for your better half"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <TouchableOpacity
            style={styles.notificationBtn}
            onPress={() => router.push('/notifications')}
          >
            <Ionicons name="notifications-outline" size={26} color="#000" />
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

        {/* Upgrade/Present Section - BEFORE Top Matches */}
        <View style={styles.upgradeSection}>
          <TouchableOpacity
            style={styles.upgradeBtn}
            onPress={() => router.push('/premium')}
          >
            <MaterialCommunityIcons name="crown" size={24} color="#000" />
            <Text style={styles.upgradeBtnText}>Upgrade Now</Text>
          </TouchableOpacity>
        </View>

        {/* Top Matches Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Matches</Text>
          <TouchableOpacity onPress={() => router.push('/all-matches')}>
            <View style={styles.seeAllBtn}>
              <Text style={styles.seeAllText}>See All</Text>
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          data={DUMMY_TOP_MATCHES}
          renderItem={renderTopMatch}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
          ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
        />


        {/* Recently Viewed Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Viewed</Text>
          <TouchableOpacity onPress={() => router.push('/recently-viewed')}>
            <View style={styles.seeAllBtn}>
              <Text style={styles.seeAllText}>See All</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recentScroll}
        >
          {DUMMY_RECENT.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.recentCard}
              onPress={() => router.push({
                pathname: '/profile-detail',
                params: { name: item.name, age: item.age.toString() }
              })}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.recentImage} />
              <View style={styles.recentInfo}>
                <Text style={styles.recentName}>{item.name}, {item.age}</Text>
                <Text style={styles.recentDetails} numberOfLines={1}>{item.profession}</Text>
                <Text style={styles.recentLocation}>{item.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Subscription Plans Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upgrade Your Journey</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
          {SUBSCRIPTION_PLANS.map((plan, index) => (
            <View
              key={plan.id}
              style={[
                styles.subCard,
                { backgroundColor: plan.color },
                index > 0 && { marginLeft: 15 }
              ]}
            >
              <Text style={[styles.subName, { color: plan.textColor }]}>{plan.name}</Text>
              <View style={styles.subPriceRow}>
                <Text style={[styles.subPrice, { color: plan.textColor }]}>{plan.price}</Text>
                <Text style={[styles.subDuration, { color: plan.textColor }]}> / {plan.duration}</Text>
              </View>

              <View style={styles.subBenefits}>
                {plan.benefits.slice(0, 3).map((benefit, i) => (
                  <View key={i} style={styles.subBenefitRow}>
                    <Ionicons name="checkmark-circle" size={16} color={plan.textColor === '#FFFFFF' ? '#FDBE01' : '#1A1A1A'} />
                    <Text style={[styles.subBenefitText, { color: plan.textColor }]}>{benefit}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={[
                  styles.subBtn,
                  plan.textColor === '#FFFFFF' ? { backgroundColor: '#FDBE01' } : { backgroundColor: '#1A1A1A' }
                ]}
                onPress={() => router.push('/premium')}
              >
                <Text style={[
                  styles.subBtnText,
                  plan.textColor === '#FFFFFF' ? { color: '#1A1A1A' } : { color: '#FFFFFF' }
                ]}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Daily Motivational Card */}
        <View style={styles.motivationContainer}>
          <View style={styles.motivationCard}>
            <View style={styles.motivationIconBox}>
              <Ionicons name="rose" size={28} color="#E91E63" />
            </View>
            <View style={styles.motivationTextContainer}>
              <Text style={styles.motivationTitle}>Daily Dose of Love</Text>
              <Text style={styles.motivationText}>
                "The best time to plant a tree was 20 years ago. The best time to find your soulmate is today. Keep exploring, your perfect match is out there."
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Subscription Modal */}
      <Modal
        visible={showPremiumModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPremiumModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowPremiumModal(false)}
            >
              <Ionicons name="close" size={24} color="#1A1A1A" />
            </TouchableOpacity>

            <View style={styles.modalIconContainer}>
              <MaterialCommunityIcons name="crown" size={48} color="#FDBE01" />
            </View>

            <Text style={styles.modalTitle}>Unlock Premium Matches!</Text>
            <Text style={styles.modalSubtext}>Get 3x more profile views and message anyone directly.</Text>

            <TouchableOpacity
              style={styles.modalCtaBtn}
              onPress={() => {
                setShowPremiumModal(false);
                router.push('/premium');
              }}
            >
              <Text style={styles.modalCtaText}>Subscribe Now!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#FDBE01',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 44,
    marginHorizontal: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: serifFont,
    fontSize: 14,
    color: '#000',
  },
  notificationBtn: {
    position: 'relative',
    padding: 5,
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FDBE01',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  filterContainer: {
    marginBottom: 10,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  filterChipActive: {
    backgroundColor: '#1A1A1A',
    borderColor: '#1A1A1A',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  upgradeSection: {
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: 'flex-end',
  },
  upgradeBtn: {
    backgroundColor: '#FDBE01',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
  },
  upgradeBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#000',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: serifFont,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAllBtn: {
    backgroundColor: '#FDBE01',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  topMatchContainer: {
    width: width * 0.85,
  },
  topMatchCard: {
    width: '100%',
    height: 480,
    borderRadius: 25,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F5F5F5',
  },
  topMatchImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartOverlay: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topMatchInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 40,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  overlayName: {
    fontSize: 24,
    fontFamily: serifFont,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  overlayDetails: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 3,
  },
  overlayLocation: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 15,
  },
  actionBtn: {
    flex: 1,
    height: 50,
    backgroundColor: '#FDBE01',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
  },

  recentScroll: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  recentCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    borderRadius: 20,
    padding: 12,
    width: width * 0.65,
    alignItems: 'center',
    marginRight: 15,
  },
  recentImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  recentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  recentName: {
    fontSize: 16,
    fontFamily: serifFont,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  recentDetails: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
    marginBottom: 2,
  },
  recentLocation: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
  },
  subCard: {
    width: 250,
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  subName: {
    fontSize: 22,
    fontFamily: serifFont,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  subPrice: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subDuration: {
    fontSize: 14,
    opacity: 0.8,
  },
  subBenefits: {
    marginBottom: 20,
  },
  subBenefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  subBenefitText: {
    fontSize: 13,
    marginLeft: 8,
    opacity: 0.9,
  },
  subBtn: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 'auto',
  },
  subBtnText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  motivationContainer: {
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 20,
  },
  motivationCard: {
    backgroundColor: '#FFF0F5',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FCE4EC',
  },
  motivationIconBox: {
    backgroundColor: '#FFFFFF',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  motivationTextContainer: {
    flex: 1,
  },
  motivationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E91E63',
    marginBottom: 4,
    fontFamily: serifFont,
  },
  motivationText: {
    fontSize: 13,
    color: '#4A4A4A',
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 30,
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 5,
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: serifFont,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 25,
  },
  modalCtaBtn: {
    backgroundColor: '#FDBE01',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  modalCtaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
});
