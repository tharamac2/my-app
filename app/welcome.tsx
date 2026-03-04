import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    ImageBackground,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const serifFont = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'Lorem Ipsum is simply',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ,',
        image: 'https://images.unsplash.com/photo-1610486801901-49b8026131f4?q=80&w=2670&auto=format&fit=crop',
    },
    {
        id: '2',
        title: 'Lorem Ipsum is simply',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ,',
        image: 'https://images.unsplash.com/photo-1595180633830-ec47902d338f?q=80&w=2670&auto=format&fit=crop',
    },
    {
        id: '3',
        title: 'Lorem Ipsum is simply',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ,',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2669&auto=format&fit=crop',
    },
];

export default function WelcomeScreen() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef<FlatList>(null);

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems[0]) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollToNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            router.replace('/login' as any);
        }
    };

    const handleSkip = () => {
        slidesRef.current?.scrollToIndex({ index: SLIDES.length - 1 });
    };

    const renderItem = ({ item }: { item: typeof SLIDES[0] }) => {
        return (
            <View style={styles.slide}>
                <ImageBackground
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="cover"
                >
                    <View style={styles.contentOverlay}>
                        <View style={styles.bottomCard}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardDescription}>{item.description}</Text>

                            <View style={styles.paginationContainer}>
                                {SLIDES.map((_, index) => {
                                    const isCurrent = index === currentIndex;
                                    return (
                                        <View
                                            key={index}
                                            style={[
                                                styles.dot,
                                                isCurrent ? styles.activeDot : styles.inactiveDot,
                                            ]}
                                        />
                                    );
                                })}
                            </View>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={scrollToNext}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.buttonText}>
                                    {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={SLIDES}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false,
                })}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                scrollEventThrottle={32}
                ref={slidesRef}
                style={styles.flatList}
            />

            {currentIndex < SLIDES.length - 1 && (
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.homeIndicator} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    flatList: {
        flex: 1,
    },
    slide: {
        width,
        height,
    },
    image: {
        flex: 1,
        width,
        height,
    },
    contentOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    topBar: {
        position: 'absolute',
        top: 60,
        right: 20,
        zIndex: 100,
    },
    skipButton: {
        backgroundColor: Colors.light.brandYellow,
        paddingHorizontal: 35,
        paddingVertical: 12,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#FFF',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    skipText: {
        color: '#1A1A1A',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomCard: {
        backgroundColor: Colors.light.brandYellow,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        paddingHorizontal: 40,
        paddingTop: 50,
        paddingBottom: 40,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 32,
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: serifFont,
        fontWeight: 'bold',
    },
    cardDescription: {
        fontSize: 16,
        color: '#1A1A1A',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 40,
        fontWeight: '600',
    },
    paginationContainer: {
        flexDirection: 'row',
        marginBottom: 40,
        alignItems: 'center',
    },
    dot: {
        height: 12,
        borderRadius: 6,
        marginHorizontal: 8,
    },
    activeDot: {
        width: 45,
        backgroundColor: Colors.light.brandDark,
    },
    inactiveDot: {
        width: 12,
        backgroundColor: '#FFFFFF',
    },
    button: {
        width: '100%',
        height: 60,
        borderRadius: 30,
        borderWidth: 1.5,
        borderColor: '#1A1A1A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#1A1A1A',
        fontSize: 24,
        fontFamily: serifFont,
        fontWeight: 'bold',
    },
    homeIndicator: {
        position: 'absolute',
        bottom: 8,
        width: 140,
        height: 5,
        backgroundColor: '#1A1A1A',
        borderRadius: 10,
        alignSelf: 'center',
    },
});
