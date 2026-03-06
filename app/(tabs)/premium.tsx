import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Platform,
    ScrollView,
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

export default function PremiumScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Header/Hero Section */}
                <View style={styles.heroSection}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="crown" size={56} color="#FDBE01" />
                    </View>
                    <Text style={styles.title}>Upgrade Your Journey</Text>
                    <Text style={styles.subtitle}>Unlock exclusive features to find your perfect match faster.</Text>
                </View>

                {/* Vertical Subscription Cards */}
                <View style={styles.plansContainer}>
                    {SUBSCRIPTION_PLANS.map((plan) => (
                        <View
                            key={plan.id}
                            style={[
                                styles.subCard,
                                { backgroundColor: plan.color },
                            ]}
                        >
                            <Text style={[styles.subName, { color: plan.textColor }]}>{plan.name}</Text>
                            <View style={styles.subPriceRow}>
                                <Text style={[styles.subPrice, { color: plan.textColor }]}>{plan.price}</Text>
                                <Text style={[styles.subDuration, { color: plan.textColor }]}> / {plan.duration}</Text>
                            </View>

                            <View style={styles.subBenefits}>
                                {plan.benefits.map((benefit, i) => (
                                    <View key={i} style={styles.subBenefitRow}>
                                        <Ionicons name="checkmark-circle" size={20} color={plan.textColor === '#FFFFFF' ? '#FDBE01' : '#1A1A1A'} />
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
                                ]}>Subscribe Now</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    heroSection: {
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 20,
    },
    iconContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'rgba(253, 190, 1, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#666666',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 20,
    },
    plansContainer: {
        paddingHorizontal: 20,
        gap: 20,
    },
    subCard: {
        width: '100%',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 6,
    },
    subName: {
        fontSize: 24,
        fontFamily: serifFont,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subPriceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 20,
    },
    subPrice: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    subDuration: {
        fontSize: 16,
        opacity: 0.8,
    },
    subBenefits: {
        marginBottom: 24,
        gap: 12,
    },
    subBenefitRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subBenefitText: {
        fontSize: 15,
        marginLeft: 12,
        opacity: 0.9,
        flex: 1,
    },
    subBtn: {
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        width: '100%',
    },
    subBtnText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});
