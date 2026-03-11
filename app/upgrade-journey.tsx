import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    Dimensions,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const premiumPlans = [
    {
        id: 'gold',
        name: 'Gold Membership',
        price: '₹499',
        duration: '3 Months',
        features: [
            'Send unlimited messages',
            'View up to 100 profiles daily',
            'Highlighted profile feature',
            'Priority customer support'
        ],
        popular: false
    },
    {
        id: 'platinum',
        name: 'Platinum Journey',
        price: '₹999',
        duration: '12 Months',
        features: [
            'All Gold features included',
            'See who visited your profile',
            'Advanced astrology matching',
            'No advertisements',
            'Profile boost every month'
        ],
        popular: true
    }
];

export default function UpgradeJourneyScreen() {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = React.useState('platinum');

    const handleSubscribe = async () => {
        const selectedPlanData = premiumPlans.find(p => p.id === selectedPlan);
        const amount = selectedPlanData ? selectedPlanData.price.replace(/[^0-9]/g, '') : '999';
        // UPI Payment Link to specific number: +91 9123585284
        const upiUrl = `upi://pay?pa=9123585284@upi&pn=MyApp&am=${amount}&cu=INR&tn=${selectedPlan}_Subscription`;
        const gpayStoreUrl = Platform.select({
            android: 'https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.paisa.user',
            ios: 'https://apps.apple.com/in/app/google-pay/id1193357041'
        });

        try {
            const canOpen = await Linking.canOpenURL(upiUrl);

            if (canOpen) {
                // Opens the generic UPI chooser or GPay if default
                await Linking.openURL(upiUrl);
            } else {
                // If no UPI app is installed, redirect to Play Store for GPay
                Alert.alert(
                    'UPI App Not Found',
                    'We couldn\'t find any UPI apps (like GPay) on your device. Would you like to download Google Pay?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Download GPay', onPress: () => Linking.openURL(gpayStoreUrl!) }
                    ]
                );
            }
        } catch (error) {
            console.error('Error opening UPI:', error);
            // Fallback to playstore if anything fails
            if (gpayStoreUrl) {
                Linking.openURL(gpayStoreUrl);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="close" size={28} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Upgrade Your Journey</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.heroSection}>
                    <Text style={styles.heroTitle}>Unlock Premium Features</Text>
                    <Text style={styles.heroSubtitle}>Find your perfect match faster with our journey-enhancing plans</Text>
                </View>

                {premiumPlans.map((plan) => (
                    <TouchableOpacity
                        key={plan.id}
                        activeOpacity={0.9}
                        style={[
                            styles.planCard,
                            selectedPlan === plan.id && styles.selectedPlanCard,
                            plan.popular && styles.popularCard
                        ]}
                        onPress={() => setSelectedPlan(plan.id)}
                    >
                        {plan.popular && (
                            <View style={styles.popularBadge}>
                                <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
                            </View>
                        )}
                        <View style={styles.planHeader}>
                            <View>
                                <Text style={styles.planName}>{plan.name}</Text>
                                <Text style={styles.planDuration}>{plan.duration}</Text>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.planPrice}>{plan.price}</Text>
                                <Ionicons
                                    name={selectedPlan === plan.id ? "checkmark-circle" : "ellipse-outline"}
                                    size={24}
                                    color={selectedPlan === plan.id ? "#FDBE01" : "#DDDDDD"}
                                    style={{ marginLeft: 10 }}
                                />
                            </View>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.featuresList}>
                            {plan.features.map((feature, idx) => (
                                <View key={idx} style={styles.featureItem}>
                                    <Ionicons name="checkmark-sharp" size={16} color="#4CAF50" style={{ marginRight: 8 }} />
                                    <Text style={styles.featureText}>{feature}</Text>
                                </View>
                            ))}
                        </View>
                    </TouchableOpacity>
                ))}

                <View style={styles.footerInfo}>
                    <Ionicons name="shield-checkmark-outline" size={20} color="#666" />
                    <Text style={styles.safeText}>Secure Checkout with UPI</Text>
                </View>
            </ScrollView>

            <View style={styles.bottomSection}>
                <TouchableOpacity style={styles.subscribeBtn} onPress={handleSubscribe}>
                    <LinearGradient
                        colors={['#FDBE01', '#E6AC00']}
                        style={styles.subscribeGradient}
                    >
                        <Text style={styles.subscribeBtnText}>Subscribe & Pay</Text>
                    </LinearGradient>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    heroSection: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    heroTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 10,
    },
    heroSubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 15,
        lineHeight: 20,
    },
    planCard: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#F0F0F0',
        position: 'relative',
    },
    selectedPlanCard: {
        borderColor: '#FDBE01',
        backgroundColor: '#FFFDF5',
    },
    popularCard: {
        shadowColor: '#FDBE01',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    popularBadge: {
        position: 'absolute',
        top: -12,
        right: 20,
        backgroundColor: '#1A1A1A',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 10,
    },
    popularBadgeText: {
        color: '#FDBE01',
        fontSize: 10,
        fontWeight: 'bold',
    },
    planHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    planName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    planDuration: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    planPrice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 15,
    },
    featuresList: {
        gap: 12,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    featureText: {
        fontSize: 14,
        color: '#444',
    },
    footerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        gap: 8,
    },
    safeText: {
        fontSize: 12,
        color: '#888',
    },
    bottomSection: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    subscribeBtn: {
        width: '100%',
        height: 56,
        borderRadius: 28,
        overflow: 'hidden',
    },
    subscribeGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subscribeBtnText: {
        color: '#1A1A1A', // Dark text on yellow looks premium
        fontSize: 18,
        fontWeight: 'bold',
    },
});
