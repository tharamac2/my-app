import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

const serifFont = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});

type OnboardStep =
    | 'profile_for'
    | 'gender'
    | 'basic_details'
    | 'location'
    | 'preferences'
    | 'physical_info'
    | 'qualification'
    | 'horoscope'
    | 'work'
    | 'uploads'
    | 'success';

export default function CreateProfileScreen() {
    const router = useRouter();
    const [step, setStep] = useState<OnboardStep>('profile_for');

    // Form State
    const [profileFor, setProfileFor] = useState<string | null>(null);
    const [gender, setGender] = useState<string | null>(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState({ day: '', month: '', year: '' });
    const [religion, setReligion] = useState('Hindu');
    const [community, setCommunity] = useState('');
    const [livingIn, setLivingIn] = useState('India');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [subCommunity, setSubCommunity] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [qualification, setQualification] = useState('');
    const [zodiac, setZodiac] = useState('');
    const [star, setStar] = useState('');
    const [dosham, setDosham] = useState<string | null>(null);
    const [income, setIncome] = useState('');
    const [worksWith, setWorksWith] = useState('');
    const [worksAs, setWorksAs] = useState('');

    const getLabelPrefix = () => {
        if (profileFor === 'myself') return gender === 'male' ? 'His' : 'Her';
        if (profileFor === 'son') return 'Your Son';
        if (profileFor === 'daughter') return 'Your Daughter';
        if (profileFor === 'brother') return 'Your Brother';
        if (profileFor === 'sister') return 'Your Sister';
        if (profileFor === 'friend') return 'Your friend';
        if (profileFor === 'relative') return 'Your relative';
        return 'Her';
    };

    const getPronoun = () => {
        if (profileFor === 'myself') return gender === 'male' ? 'He' : 'She';
        if (profileFor === 'son' || profileFor === 'brother' || profileFor === 'daughter' || profileFor === 'sister') return 'He';
        return 'He';
    };

    const getPossessive = (currentStep?: OnboardStep) => {
        if (profileFor === 'myself') return gender === 'male' ? 'His' : 'Her';

        // Mockup specific logic: swap possessives for religion step in relative paths
        if (currentStep === 'preferences') {
            if (profileFor === 'son' || profileFor === 'brother' || profileFor === 'friend' || profileFor === 'relative') return 'Her';
            if (profileFor === 'daughter' || profileFor === 'sister') return 'His';
        }

        if (profileFor === 'son' || profileFor === 'brother' || profileFor === 'daughter' || profileFor === 'sister' || profileFor === 'friend' || profileFor === 'relative') return 'His';
        return 'His';
    };

    const handleContinue = () => {
        if (step === 'profile_for') {
            if (profileFor === 'myself' || profileFor === 'friend' || profileFor === 'relative') {
                setStep('gender');
            } else {
                if (profileFor === 'son' || profileFor === 'brother') setGender('male');
                else if (profileFor === 'daughter' || profileFor === 'sister') setGender('female');
                setStep('basic_details');
            }
        }
        else if (step === 'gender') setStep('basic_details');
        else if (step === 'basic_details') setStep('preferences');
        else if (step === 'preferences') setStep('location');
        else if (step === 'location') setStep('physical_info');
        else if (step === 'physical_info') setStep('qualification');
        else if (step === 'qualification') setStep('work');
        else if (step === 'work') setStep('horoscope');
        else if (step === 'horoscope') setStep('uploads');
        else if (step === 'uploads') setStep('success');
        else router.replace('/(tabs)');
    };

    const handleBack = () => {
        if (step === 'gender') setStep('profile_for');
        else if (step === 'basic_details') {
            if (profileFor === 'myself' || profileFor === 'friend' || profileFor === 'relative') setStep('gender');
            else setStep('profile_for');
        }
        else if (step === 'preferences') setStep('basic_details');
        else if (step === 'location') setStep('preferences');
        else if (step === 'physical_info') setStep('location');
        else if (step === 'qualification') setStep('physical_info');
        else if (step === 'work') setStep('qualification');
        else if (step === 'horoscope') setStep('work');
        else if (step === 'uploads') setStep('horoscope');
        else if (step === 'success') setStep('uploads');
        else router.back();
    };

    const renderHeaderIcon = (type: 'person' | 'gender' | 'details' | 'location' | 'qualification' | 'work' | 'success') => {
        if (type === 'gender') return (
            <View style={styles.yellowCircle}>
                <View style={styles.genderIconContainer}>
                    <Ionicons name="man-outline" size={50} color="#1A1A1A" />
                    <Ionicons name="woman-outline" size={50} color="#1A1A1A" style={{ marginLeft: -15 }} />
                </View>
            </View>
        );

        if (type === 'location') return (
            <View style={styles.yellowCircle}>
                <Ionicons name="location-outline" size={70} color="#1A1A1A" />
            </View>
        );

        if (type === 'qualification') return (
            <View style={styles.yellowCircle}>
                <Ionicons name="school-outline" size={70} color="#1A1A1A" />
            </View>
        );

        if (type === 'work') return (
            <View style={styles.yellowCircle}>
                <Ionicons name="briefcase-outline" size={70} color="#1A1A1A" />
            </View>
        );

        if (type === 'success') return (
            <View style={styles.successIconCircle}>
                <Ionicons name="person" size={100} color="#000" />
            </View>
        );

        return (
            <View style={styles.yellowCircle}>
                {type === 'details' ? (
                    <MaterialCommunityIcons name="account-details-outline" size={70} color="#1A1A1A" />
                ) : (
                    <Ionicons name="person-outline" size={70} color="#1A1A1A" />
                )}
            </View>
        );
    };

    const renderStepProfileFor = () => (
        <View style={styles.stepContent}>
            {renderHeaderIcon('person')}
            <Text style={styles.title}>This Profile is for</Text>
            <View style={styles.optionsGrid}>
                {[
                    { id: 'myself', label: 'MySelf' },
                    { id: 'son', label: 'My Son' },
                    { id: 'daughter', label: 'My Daughter' },
                    { id: 'brother', label: 'My Brother' },
                    { id: 'sister', label: 'My Sister' },
                    { id: 'friend', label: 'My Friend' },
                    { id: 'relative', label: 'My Relative' },
                ].map((opt) => (
                    <TouchableOpacity
                        key={opt.id}
                        style={[styles.optionItem, profileFor === opt.id && styles.optionItemSelected]}
                        onPress={() => setProfileFor(opt.id)}
                    >
                        <View style={[styles.optionCircle, profileFor === opt.id && styles.optionCircleSelected]} />
                        <Text style={styles.optionLabel}>{opt.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderStepGender = () => (
        <View style={styles.stepContent}>
            {renderHeaderIcon('gender')}
            <Text style={styles.title}>{profileFor === 'myself' ? 'You are' : `${getLabelPrefix()} is`}</Text>
            <View style={styles.genderOptions}>
                {[
                    { id: 'male', label: 'Male', sub: profileFor === 'myself' ? "I'mL looking for a female" : "I'mL looking for a female for him" },
                    { id: 'female', label: 'Female', sub: profileFor === 'myself' ? "I'mL looking for a male" : "I'mL looking for a male for him" },
                ].map((opt) => (
                    <TouchableOpacity
                        key={opt.id}
                        style={[styles.genderItem, gender === opt.id && styles.genderItemSelected]}
                        onPress={() => setGender(opt.id)}
                    >
                        <View style={[styles.optionCircle, gender === opt.id && styles.optionCircleSelected]} />
                        <View>
                            <Text style={styles.genderLabel}>{opt.label}</Text>
                            <Text style={styles.genderSub}>{opt.sub}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderStepBasicDetails = () => (
        <View style={styles.stepContent}>
            {renderHeaderIcon('details')}
            <Text style={styles.title}>{getLabelPrefix()} name</Text>
            <View style={styles.inputGroup}>
                <TextInput
                    style={styles.pillInput}
                    placeholder="First Name"
                    placeholderTextColor="#999"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={styles.pillInput}
                    placeholder="Last Name"
                    placeholderTextColor="#999"
                    value={lastName}
                    onChangeText={setLastName}
                />
            </View>

            <Text style={[styles.title, { marginTop: 30 }]}>{getLabelPrefix()} Data of birth</Text>
            <View style={styles.dobRow}>
                <View style={styles.dobColumn}>
                    <Text style={styles.dobLabel}>Day</Text>
                    <TextInput
                        style={styles.dobInput}
                        placeholder="DD"
                        maxLength={2}
                        keyboardType="number-pad"
                        value={dob.day}
                        onChangeText={(t) => setDob({ ...dob, day: t })}
                    />
                </View>
                <View style={styles.dobColumn}>
                    <Text style={styles.dobLabel}>Month</Text>
                    <TextInput
                        style={styles.dobInput}
                        placeholder="MM"
                        maxLength={2}
                        keyboardType="number-pad"
                        value={dob.month}
                        onChangeText={(t) => setDob({ ...dob, month: t })}
                    />
                </View>
                <View style={styles.dobColumn}>
                    <Text style={styles.dobLabel}>Year</Text>
                    <TextInput
                        style={styles.dobInput}
                        placeholder="YYYY"
                        maxLength={4}
                        keyboardType="number-pad"
                        value={dob.year}
                        onChangeText={(t) => setDob({ ...dob, year: t })}
                    />
                </View>
            </View>
        </View>
    );

    const renderStepLocation = () => (
        <View style={styles.stepContent}>
            {renderHeaderIcon('location')}
            <Text style={styles.title}>State</Text>
            <TouchableOpacity style={styles.dropdownInput}>
                <Text style={styles.dropdownPlaceholderText}>State {getPronoun().toLowerCase()} lives in</Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <Text style={[styles.title, { marginTop: 30 }]}>City</Text>
            <TouchableOpacity style={styles.dropdownInput}>
                <Text style={styles.dropdownPlaceholderText}>City {getPronoun().toLowerCase()} lives in</Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <Text style={[styles.title, { marginTop: 30 }]}>Sub-Community</Text>
            <TouchableOpacity style={styles.dropdownInput}>
                <Text style={styles.dropdownPlaceholderText}>{getPossessive(step)} sub-Community</Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <View style={styles.checkboxRow}>
                <View style={styles.checkbox} />
                <Text style={styles.checkboxLabel}>Not particular about my partner's community (Caste no bar)</Text>
            </View>
        </View>
    );

    const renderStepPreferences = () => (
        <View style={styles.stepContent}>
            {renderHeaderIcon('details')}
            <Text style={styles.title}>{getPossessive(step)} religion</Text>
            <TouchableOpacity style={styles.dropdownInput}>
                <Text style={styles.dropdownActiveText}>{religion}</Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <Text style={[styles.title, { marginTop: 30 }]}>Community</Text>
            <TouchableOpacity style={styles.dropdownInput}>
                <Text style={styles.dropdownPlaceholderText}>Community</Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <Text style={[styles.title, { marginTop: 30 }]}>Living in</Text>
            <TouchableOpacity style={styles.dropdownInput}>
                <Text style={styles.dropdownActiveText}>{livingIn}</Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>
        </View>
    );

    const renderStepPhysicalInfo = () => (
        <View style={styles.stepContent}>
            {renderHeaderIcon('details')}
            <Text style={styles.title}>Marital status</Text>
            <TouchableOpacity style={styles.dropdownInput}>
                <Text style={styles.dropdownPlaceholderText}>{getPossessive(step)} Marital status</Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <Text style={[styles.title, { marginTop: 30 }]}>Height</Text>
            <TouchableOpacity style={styles.dropdownInput}>
                <Text style={styles.dropdownPlaceholderText}>{getPossessive(step)} Height *</Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <Text style={[styles.title, { marginTop: 30 }]}>Weight</Text>
            <TouchableOpacity style={styles.dropdownInput}>
                <Text style={styles.dropdownPlaceholderText}>{getPossessive(step)} Weight *</Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>
        </View>
    );

    const renderStepQualification = () => (
        <View style={styles.stepContent}>
            {renderHeaderIcon('qualification')}
            <Text style={styles.title}>Highest qualification</Text>
            <TouchableOpacity style={styles.dropdownInput}>
                <Text style={styles.dropdownPlaceholderText}>{getPossessive(step)} highest qualification</Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>
        </View>
    );

    const renderStepHoroscopeInfo = () => (
        <View style={styles.stepContent}>
            {renderHeaderIcon('details')}
            <Text style={styles.title}>Horoscopes information</Text>
            <View style={styles.multiRowInput}>
                <View style={styles.halfInput}>
                    <Text style={styles.inputSubTitle}>Zodiac</Text>
                    <TouchableOpacity style={styles.dropdownInputSmall}>
                        <Text style={styles.dropdownPlaceholderText}>Select</Text>
                        <Ionicons name="caret-down" size={20} color="#1A1A1A" />
                    </TouchableOpacity>
                </View>
                <View style={styles.halfInput}>
                    <Text style={styles.inputSubTitle}>Star</Text>
                    <TouchableOpacity style={styles.dropdownInputSmall}>
                        <Text style={styles.dropdownPlaceholderText}>Select</Text>
                        <Ionicons name="caret-down" size={20} color="#1A1A1A" />
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={[styles.title, { marginTop: 30, fontSize: 26 }]}>Having dosham</Text>
            <View style={styles.doshamGrid}>
                {['Yes', 'No', "Don't know"].map((opt) => (
                    <TouchableOpacity
                        key={opt}
                        style={[styles.miniOptionItem, dosham === opt && styles.miniOptionItemSelected]}
                        onPress={() => setDosham(opt)}
                    >
                        <View style={[styles.optionCircle, dosham === opt && styles.optionCircleSelected]} />
                        <Text style={styles.optionLabel}>{opt}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderStepWorkInfo = () => (
        <View style={styles.stepContent}>
            {renderHeaderIcon('work')}
            <Text style={styles.title}>Annual income</Text>
            <TouchableOpacity style={styles.dropdownInput}>
                <Text style={styles.dropdownPlaceholderText}>{getPossessive(step)} annual income*</Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <Text style={[styles.title, { marginTop: 30 }]}>Work details</Text>
            <TouchableOpacity style={[styles.dropdownInput, { marginBottom: 20 }]}>
                <Text style={styles.dropdownPlaceholderText}>{getPronoun()} works with</Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownInput}>
                <Text style={styles.dropdownPlaceholderText}>{getPronoun()} works as</Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>
        </View>
    );

    const renderStepUploads = () => (
        <View style={styles.stepContent}>
            {renderHeaderIcon('details')}
            <Text style={styles.title}>Add Horoscope</Text>
            <TouchableOpacity style={styles.uploadBoxFull}>
                <View style={styles.plusBg}>
                    <Ionicons name="add" size={30} color="#000" />
                </View>
                <Text style={styles.uploadText}>Upload Image / PDF</Text>
            </TouchableOpacity>

            <Text style={[styles.title, { marginTop: 30 }]}>Add profile photo</Text>
            <View style={styles.profileUploadRow}>
                <TouchableOpacity style={styles.uploadBoxHalf}>
                    <View style={styles.plusBg}>
                        <Ionicons name="add" size={30} color="#000" />
                    </View>
                    <Text style={styles.miniUploadText}>Click to add photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.uploadBoxHalf}>
                    <View style={styles.plusBg}>
                        <Ionicons name="add" size={30} color="#000" />
                    </View>
                    <Text style={styles.miniUploadText}>Click to add photo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderStepSuccess = () => (
        <View style={styles.stepContent}>
            <View style={{ marginTop: 60 }}>
                {renderHeaderIcon('success')}
            </View>
            <View style={styles.successFooter}>
                <TouchableOpacity
                    style={styles.successButton}
                    onPress={() => router.replace('/(tabs)')}
                >
                    <Text style={styles.successButtonText}>Profile Created sucessfully</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const isButtonEnabled = () => {
        if (step === 'profile_for') return !!profileFor;
        if (step === 'gender') return !!gender;
        if (step === 'basic_details') return firstName && lastName && dob.day && dob.month && dob.year;
        return true;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Ionicons name="chevron-back" size={32} color={Colors.light.brandYellow} />
                    </TouchableOpacity>
                </View>

                {step === 'profile_for' && renderStepProfileFor()}
                {step === 'gender' && renderStepGender()}
                {step === 'basic_details' && renderStepBasicDetails()}
                {step === 'location' && renderStepLocation()}
                {step === 'preferences' && renderStepPreferences()}
                {step === 'physical_info' && renderStepPhysicalInfo()}
                {step === 'qualification' && renderStepQualification()}
                {step === 'horoscope' && renderStepHoroscopeInfo()}
                {step === 'work' && renderStepWorkInfo()}
                {step === 'uploads' && renderStepUploads()}
                {step === 'success' && renderStepSuccess()}

                {step !== 'success' && (
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[styles.continueButton, !isButtonEnabled() && styles.continueButtonDisabled]}
                            onPress={handleContinue}
                            disabled={!isButtonEnabled()}
                        >
                            <Text style={styles.continueButtonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
            <View style={styles.homeIndicator} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 25,
    },
    header: {
        paddingTop: 20,
        height: 60,
    },
    backButton: {
        width: 40,
        height: 40,
    },
    stepContent: {
        alignItems: 'center',
        marginTop: 20,
    },
    yellowCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: Colors.light.brandYellow,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60,
    },
    successIconCircle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: Colors.light.brandYellow,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 80,
    },
    genderIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        width: '100%',
        fontSize: 32,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 35,
        textAlign: 'left',
    },
    inputSubTitle: {
        fontSize: 32,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 15,
        textAlign: 'left',
    },
    optionsGrid: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    optionItem: {
        width: '48%',
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EFEFEF',
        borderRadius: 30,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    optionItemSelected: {
        borderColor: Colors.light.brandYellow,
        backgroundColor: Colors.light.brandYellow,
    },
    optionCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#FFF',
        marginRight: 10,
    },
    optionCircleSelected: {
        borderColor: Colors.light.brandYellow,
        borderWidth: 6,
    },
    optionLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A1A1A',
        fontFamily: serifFont,
    },
    genderOptions: {
        width: '100%',
    },
    genderItem: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: Colors.light.brandYellow,
        borderRadius: 35,
        paddingHorizontal: 25,
        marginBottom: 25,
    },
    genderItemSelected: {
        backgroundColor: Colors.light.brandYellow,
    },
    genderLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
        fontFamily: serifFont,
    },
    genderSub: {
        fontSize: 12,
        color: '#666',
        fontWeight: 'bold',
    },
    inputGroup: {
        width: '100%',
        gap: 20,
    },
    pillInput: {
        width: '100%',
        height: 55,
        borderWidth: 1.5,
        borderColor: Colors.light.brandYellow,
        borderRadius: 30,
        paddingHorizontal: 25,
        fontSize: 18,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    dobRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dobColumn: {
        width: '30%',
        alignItems: 'center',
    },
    dobLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 8,
    },
    dobInput: {
        width: '100%',
        height: 55,
        borderWidth: 1.5,
        borderColor: Colors.light.brandYellow,
        borderRadius: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#999',
    },
    dropdownInput: {
        width: '100%',
        height: 55,
        borderWidth: 1.5,
        borderColor: Colors.light.brandYellow,
        borderRadius: 30,
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    dropdownInputSmall: {
        width: '100%',
        height: 55,
        borderWidth: 1.5,
        borderColor: Colors.light.brandYellow,
        borderRadius: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dropdownActiveText: {
        fontSize: 18,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#666',
    },
    dropdownPlaceholderText: {
        fontSize: 18,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#999',
    },
    multiRowInput: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        width: '47%',
    },
    doshamGrid: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    miniOptionItem: {
        width: '48%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EFEFEF',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    miniOptionItemSelected: {
        borderColor: Colors.light.brandYellow,
    },
    uploadBoxFull: {
        width: '100%',
        height: 140,
        borderWidth: 1.5,
        borderColor: Colors.light.brandYellow,
        borderRadius: 20,
        borderStyle: 'solid',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    profileUploadRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    uploadBoxHalf: {
        width: '47%',
        height: 140,
        borderWidth: 1.5,
        borderColor: Colors.light.brandYellow,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    plusBg: {
        width: 80,
        height: 60,
        backgroundColor: Colors.light.brandYellow,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    uploadText: {
        fontSize: 16,
        color: '#999',
        fontFamily: serifFont,
        fontWeight: 'bold',
    },
    miniUploadText: {
        fontSize: 12,
        color: '#999',
        fontFamily: serifFont,
        fontWeight: 'bold',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 15,
        paddingHorizontal: 5,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1.5,
        borderColor: Colors.light.brandYellow,
        borderRadius: 4,
        marginRight: 10,
    },
    checkboxLabel: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#999',
        flex: 1,
    },
    footer: {
        marginTop: 40,
        marginBottom: 60,
        alignItems: 'center',
    },
    successFooter: {
        width: width,
        alignItems: 'center',
        marginTop: 20,
    },
    continueButton: {
        width: width * 0.7,
        height: 55,
        backgroundColor: Colors.light.brandYellow,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    successButton: {
        width: width * 0.85,
        height: 55,
        backgroundColor: Colors.light.brandYellow,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueButtonDisabled: {
        backgroundColor: '#EAEAEA',
        elevation: 0,
    },
    continueButtonText: {
        fontSize: 20,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    successButtonText: {
        fontSize: 18,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
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
