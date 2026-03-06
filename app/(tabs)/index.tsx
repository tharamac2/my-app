import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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
import { CompatibilityRing } from '../../components/ui/CompatibilityRing';

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
    compatibility: 85,
  },
  {
    id: '2',
    name: 'Aishwarya',
    age: 26,
    tags: ['📍 Bangalore', '💼 UX Designer', '🎓 B.Des', '🗣️ Kannada'],
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop',
    compatibility: 60,
  },
  {
    id: '3',
    name: 'Diya Patel',
    age: 27,
    tags: ['📍 Mumbai', '💼 Architect', '🎓 M.Arch', '🗣️ Gujarati'],
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop',
    compatibility: 45,
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
  const [activeFilter, setActiveFilter] = useState('New Matches');
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  React.useEffect(() => {
    // Show premium modal every time the app/screen is opened
    setShowPremiumModal(true);
  }, []);

  const renderTopMatch = ({ item, index }: { item: typeof DUMMY_TOP_MATCHES[0], index: number }) => (
    <View style={[styles.topMatchCard, { marginLeft: index === 0 ? 20 : 0 }]}>
      <View style={styles.topMatchImageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.topMatchImage} />

        {/* Astrological Compatibility Ring */}
        <CompatibilityRing percentage={item.compatibility} size={54} strokeWidth={5} />

        {/* Heart button */}
        <TouchableOpacity style={styles.heartBtn}>
          <Ionicons name="heart" size={24} color="#FDBE01" />
        </TouchableOpacity>
      </View>

      {/* Profile Details */}
      <View style={styles.topMatchDetails}>
        <Text style={styles.topMatchName}>{item.name}, {item.age}</Text>

        <View style={styles.tagsContainer}>
          {item.tags.map((tag, i) => (
            <View key={i} style={styles.tagPill}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* CTAs */}
        <View style={styles.inlineCtaContainer}>
          <TouchableOpacity style={styles.inlineCtaBtn}>
            <Ionicons name="chatbubble-outline" size={18} color="#1A1A1A" />
            <Text style={styles.inlineCtaText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.inlineCtaBtn, styles.inlineCtaBtnPrimary]}>
            <MaterialCommunityIcons name="ring" size={18} color="#1A1A1A" />
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

        {/* Inline Premium Banner */}
        <View style={styles.inlineBanner}>
          <MaterialCommunityIcons name="crown" size={24} color="#FDBE01" style={{ marginRight: 10 }} />
          <Text style={styles.inlineBannerText}>Upgrade to Premium for exclusive benefits.</Text>
          <TouchableOpacity style={styles.inlineBannerBtn}>
            <Text style={styles.inlineBannerBtnText}>Upgrade</Text>
          </TouchableOpacity>
        </View>

        {/* Top Matches Section */}
        <View style={styles.sectionHeaderTopMatches}>
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
          contentContainerStyle={{ paddingRight: 20, paddingBottom: 20 }}
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

              <TouchableOpacity style={[
                styles.subBtn,
                plan.textColor === '#FFFFFF' ? { backgroundColor: '#FDBE01' } : { backgroundColor: '#1A1A1A' }
              ]}>
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
                // navigate to premium screen if needed
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    marginTop: 10,
  },
  profilePic: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FDBE01',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 25,
    height: 46,
    marginHorizontal: 12,
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
  notificationBtn: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FDBE01',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  filterContainer: {
    marginBottom: 20,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  sectionHeaderTopMatches: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
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
    height: 470,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 5,
  },
  topMatchImageContainer: {
    width: '100%',
    height: 260,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  topMatchImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topMatchDetails: {
    flex: 1,
  },
  topMatchName: {
    fontSize: 24,
    fontFamily: serifFont,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tagPill: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  tagText: {
    color: '#4A4A4A',
    fontSize: 12,
    fontWeight: '600',
  },
  inlineCtaContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 'auto',
  },
  inlineCtaBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
  },
  inlineCtaBtnPrimary: {
    backgroundColor: '#FDBE01',
  },
  inlineCtaText: {
    color: '#1A1A1A',
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
    backgroundColor: '#FFF0F5', // Light pinkish background
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  motivationTextContainer: {
    flex: 1,
  },
  motivationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E91E63',
    marginBottom: 6,
    fontFamily: serifFont,
  },
  motivationText: {
    fontSize: 14,
    color: '#4A4A4A',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  inlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
  },
  inlineBannerText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
    marginRight: 10,
    lineHeight: 20,
  },
  inlineBannerBtn: {
    backgroundColor: '#FDBE01',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  inlineBannerBtnText: {
    color: '#1A1A1A',
    fontWeight: '600',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: '100%',
    padding: 24,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(253, 190, 1, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: serifFont,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtext: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  modalCtaBtn: {
    backgroundColor: '#FDBE01',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCtaText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
