import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
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

interface Message {
    id: string;
    text: string;
    sender: 'me' | 'other';
    time: string;
    status?: 'sent' | 'read';
}

export default function ChatDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [message, setMessage] = useState('');
    const flatListRef = useRef<FlatList>(null);

    const chatPartner = {
        name: (params.name as string) || 'Riya Shibu',
        imageUrl: (params.imageUrl as string) || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop',
    };
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indu',
            sender: 'other',
            time: '15.34pm',
        },
        {
            id: '2',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indu',
            sender: 'me',
            time: '15.34pm',
            status: 'read',
        },
        {
            id: '3',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indu',
            sender: 'other',
            time: '15.34pm',
        },
        {
            id: '4',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indu',
            sender: 'me',
            time: '6.24pm',
            status: 'read',
        },
    ]);

    const handleSendMessage = () => {
        if (message.trim().length === 0) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: message,
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase().replace(' ', ''),
            status: 'sent'
        };

        setMessages(prev => [...prev, newMessage]);
        setMessage('');

        // Scroll to bottom after state update
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    const handleMicPress = () => {
        Alert.alert('Voice Note', 'Voice recording feature is currently being integrated and will be available soon!');
    };

    const renderMessage = ({ item }: { item: Message }) => {
        const isMe = item.sender === 'me';
        return (
            <View style={[styles.messageRow, isMe ? styles.myMessageRow : styles.otherMessageRow]}>
                <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
                    <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.otherMessageText]}>
                        {item.text}
                    </Text>
                </View>
                <View style={[styles.timeContainer, isMe ? styles.myTimeContainer : styles.otherTimeContainer]}>
                    <Text style={styles.timeText}>{item.time}</Text>
                    {isMe && item.status === 'read' && (
                        <Ionicons name="checkmark-done" size={16} color="#03A9F4" style={{ marginLeft: 4 }} />
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#FDBE01" />
                </TouchableOpacity>
                <View style={styles.headerProfile}>
                    <View style={styles.avatarBorder}>
                        <Image source={{ uri: chatPartner.imageUrl }} style={styles.avatar} />
                    </View>
                    <Text style={styles.headerTitle}>{chatPartner.name}</Text>
                </View>
                <View style={{ width: 40 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={item => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={styles.listContent}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                    ListHeaderComponent={() => (
                        <View style={styles.dateSeparator}>
                            <Text style={styles.dateText}>today</Text>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                />

                {/* Input Area */}
                <View style={styles.inputContainer}>
                    <View style={styles.pillInput}>
                        <TextInput
                            style={styles.input}
                            placeholder="type here...."
                            placeholderTextColor="#666"
                            value={message}
                            onChangeText={setMessage}
                            onSubmitEditing={handleSendMessage}
                        />
                        <TouchableOpacity style={styles.micBtn} onPress={handleMicPress}>
                            <Ionicons name="mic" size={24} color="#000" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
                            <Ionicons name="arrow-forward-circle" size={32} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
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
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        padding: 5,
    },
    headerProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: 10,
    },
    avatarBorder: {
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 1.5,
        borderColor: '#FDBE01',
        padding: 2,
        marginRight: 12,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: serifFont,
        fontWeight: '700',
        color: '#000000',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    dateSeparator: {
        alignItems: 'center',
        marginVertical: 20,
    },
    dateText: {
        fontSize: 14,
        fontFamily: serifFont,
        color: '#000000',
        fontWeight: '700',
    },
    messageRow: {
        marginBottom: 20,
        maxWidth: '85%',
    },
    otherMessageRow: {
        alignSelf: 'flex-start',
    },
    myMessageRow: {
        alignSelf: 'flex-end',
    },
    bubble: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 15,
    },
    otherBubble: {
        backgroundColor: '#FFF8E1', // Light cream
    },
    myBubble: {
        backgroundColor: '#FDBE01', // Gold
    },
    messageText: {
        fontSize: 14,
        fontFamily: serifFont,
        lineHeight: 20,
        fontWeight: '600',
    },
    otherMessageText: {
        color: '#000000',
        fontFamily: serifFont,
    },
    myMessageText: {
        color: '#000000',
        fontFamily: serifFont,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    otherTimeContainer: {
        alignSelf: 'flex-start',
    },
    myTimeContainer: {
        alignSelf: 'flex-end',
    },
    timeText: {
        fontSize: 11,
        fontFamily: serifFont,
        color: '#000000',
        fontWeight: '700',
    },
    inputContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
    },
    pillInput: {
        backgroundColor: '#FFF8E1',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 56,
    },
    input: {
        flex: 1,
        fontFamily: serifFont,
        fontSize: 16,
        color: '#000',
        fontWeight: '600',
    },
    micBtn: {
        marginHorizontal: 10,
    },
    sendBtn: {
        marginLeft: 5,
    },
});
