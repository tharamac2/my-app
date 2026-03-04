import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

// A high-quality placeholder image for the premium feel
const ONBOARDING_IMAGE = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2669&auto=format&fit=crop';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: ONBOARDING_IMAGE }}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>Find Your</Text>
                        <Text style={styles.titleBold}>Perfect Match</Text>
                        <Text style={styles.subtitle}>
                            Join the most trusted matrimony platform to find your life partner.
                        </Text>

                        <View style={styles.buttonContainer}>
                            <PrimaryButton
                                title="Create Account"
                                onPress={() => router.push('/register')}
                                style={styles.registerButton}
                            />
                            <PrimaryButton
                                title="Login"
                                type="outline"
                                onPress={() => router.push('/login')}
                                style={styles.loginButton}
                                textStyle={{ color: '#FFFFFF' }} // Override to white for the dark overlay
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width,
        height,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for text readability
        justifyContent: 'flex-end',
        paddingBottom: 60,
    },
    contentContainer: {
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 36,
        color: '#FFFFFF',
        fontWeight: '300',
    },
    titleBold: {
        fontSize: 42,
        color: '#D4AF37', // Gold accent
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#E5E7EB',
        lineHeight: 24,
        marginBottom: 40,
    },
    buttonContainer: {
        gap: 16,
    },
    registerButton: {
        backgroundColor: '#D4AF37', // Use gold for the primary action here
    },
    loginButton: {
        borderColor: '#FFFFFF',
    },
});
