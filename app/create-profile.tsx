import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    Modal,
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

    // Image State
    const [horoscopeImage, setHoroscopeImage] = useState<string | null>(null);
    const [profileImages, setProfileImages] = useState<(string | null)[]>([null, null]);

    const pickImage = async (type: 'horoscope' | 'profile', index?: number) => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'We need permission to access your gallery to upload photos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: type === 'profile' ? [1, 1] : [3, 4],
            quality: 1,
        });

        if (!result.canceled) {
            if (type === 'horoscope') {
                setHoroscopeImage(result.assets[0].uri);
            } else if (type === 'profile' && index !== undefined) {
                const newImages = [...profileImages];
                newImages[index] = result.assets[0].uri;
                setProfileImages(newImages);
            }
        }
    };

    const removeImage = (type: 'horoscope' | 'profile', index?: number) => {
        if (type === 'horoscope') setHoroscopeImage(null);
        else if (type === 'profile' && index !== undefined) {
            const newImages = [...profileImages];
            newImages[index] = null;
            setProfileImages(newImages);
        }
    };

    // Picker State
    const [pickerVisible, setPickerVisible] = useState(false);
    const [pickerOptions, setPickerOptions] = useState<string[]>([]);
    const [pickerTarget, setPickerTarget] = useState<string | null>(null);
    const [pickerTitle, setPickerTitle] = useState('');

    const openPicker = (target: string, title: string, options: string[]) => {
        setPickerTarget(target);
        setPickerTitle(title);
        setPickerOptions(options);
        setPickerVisible(true);
    };

    const handleSelect = (value: string) => {
        switch (pickerTarget) {
            case 'religion': setReligion(value); break;
            case 'community': setCommunity(value); break;
            case 'livingIn': setLivingIn(value); break;
            case 'state': setState(value); break;
            case 'city': setCity(value); break;
            case 'subCommunity': setSubCommunity(value); break;
            case 'maritalStatus': setMaritalStatus(value); break;
            case 'height': setHeight(value); break;
            case 'weight': setWeight(value); break;
            case 'qualification': setQualification(value); break;
            case 'zodiac': setZodiac(value); break;
            case 'star': setStar(value); break;
            case 'income': setIncome(value); break;
            case 'worksWith': setWorksWith(value); break;
            case 'worksAs': setWorksAs(value); break;
        }
        setPickerVisible(false);
    };

    const OPTIONS = {
        religion: ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain', 'Other'],
        community: ['Brahmins', 'Rajputs', 'Agarwals', 'Jats', 'Marathas', 'Kayasthas', 'Other'],
        livingIn: ['India', 'USA', 'UK', 'Canada', 'Australia', 'Other'],
        state: ['Andhra Pradesh', 'Tamil Nadu', 'Karnataka', 'Maharashtra', 'Delhi', 'Uttar Pradesh', 'Other'],
        city: ['Mumbai', 'Chennai', 'Bangalore', 'Delhi', 'Hyderabad', 'Pune', 'Other'],
        subCommunity: ['Generic', 'Special', 'Traditional', 'Modern', 'Other'],
        maritalStatus: ['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'],
        height: ["4'5\"", "4'10\"", "5'0\"", "5'2\"", "5'5\"", "5'8\"", "6'0\"", "6'2\"", "6'5\""],
        weight: ['40 kg', '50 kg', '60 kg', '70 kg', '80 kg', '90 kg', '100 kg'],
        qualification: ['B.Tech', 'M.Tech', 'MBA', 'MBBS', 'PhD', 'B.Com', 'M.Com', 'Other'],
        zodiac: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],
        star: ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Other'],
        income: ['2 - 5 LPA', '5 - 10 LPA', '10 - 20 LPA', '20 - 50 LPA', '50+ LPA'],
        worksWith: ['Private Sector', 'Government Sector', 'Defense', 'Self Employed', 'Business', 'Not Working'],
        worksAs: ['Engineer', 'Doctor', 'Teacher', 'Manager', 'Entrepreneur', 'Architect', 'Artist', 'Other'],
    };

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
                    { id: 'male', label: 'Male', sub: profileFor === 'myself' ? "I'm looking for a female" : "I'mL looking for a female for him" },
                    { id: 'female', label: 'Female', sub: profileFor === 'myself' ? "I'm looking for a male" : "I'mL looking for a male for him" },
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
            <TouchableOpacity style={styles.dropdownInput} onPress={() => openPicker('state', 'Select State', OPTIONS.state)}>
                <Text style={state ? styles.dropdownActiveText : styles.dropdownPlaceholderText}>
                    {state || `State ${getPronoun().toLowerCase()} lives in`}
                </Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <Text style={[styles.title, { marginTop: 30 }]}>City</Text>
            <TouchableOpacity style={styles.dropdownInput} onPress={() => openPicker('city', 'Select City', OPTIONS.city)}>
                <Text style={city ? styles.dropdownActiveText : styles.dropdownPlaceholderText}>
                    {city || `City ${getPronoun().toLowerCase()} lives in`}
                </Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <Text style={[styles.title, { marginTop: 30 }]}>Sub-Community</Text>
            <TouchableOpacity style={styles.dropdownInput} onPress={() => openPicker('subCommunity', 'Select Sub-Community', OPTIONS.subCommunity)}>
                <Text style={subCommunity ? styles.dropdownActiveText : styles.dropdownPlaceholderText}>
                    {subCommunity || `${getPossessive(step)} sub-Community`}
                </Text>
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
            <TouchableOpacity style={styles.dropdownInput} onPress={() => openPicker('religion', 'Select Religion', OPTIONS.religion)}>
                <Text style={religion ? styles.dropdownActiveText : styles.dropdownPlaceholderText}>
                    {religion || 'Select Religion'}
                </Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <Text style={[styles.title, { marginTop: 30 }]}>Community</Text>
            <TouchableOpacity style={styles.dropdownInput} onPress={() => openPicker('community', 'Select Community', OPTIONS.community)}>
                <Text style={community ? styles.dropdownActiveText : styles.dropdownPlaceholderText}>
                    {community || 'Community'}
                </Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <Text style={[styles.title, { marginTop: 30 }]}>Living in</Text>
            <TouchableOpacity style={styles.dropdownInput} onPress={() => openPicker('livingIn', 'Select Living Country', OPTIONS.livingIn)}>
                <Text style={livingIn ? styles.dropdownActiveText : styles.dropdownPlaceholderText}>
                    {livingIn || 'Select Country'}
                </Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>
        </View>
    );

    const renderStepPhysicalInfo = () => (
        <View style={styles.stepContent}>
            {renderHeaderIcon('details')}
            <Text style={styles.title}>Marital status</Text>
            <TouchableOpacity style={styles.dropdownInput} onPress={() => openPicker('maritalStatus', 'Select Marital Status', OPTIONS.maritalStatus)}>
                <Text style={maritalStatus ? styles.dropdownActiveText : styles.dropdownPlaceholderText}>
                    {maritalStatus || `${getPossessive(step)} Marital status`}
                </Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <Text style={[styles.title, { marginTop: 30 }]}>Height</Text>
            <TouchableOpacity style={styles.dropdownInput} onPress={() => openPicker('height', 'Select Height', OPTIONS.height)}>
                <Text style={height ? styles.dropdownActiveText : styles.dropdownPlaceholderText}>
                    {height || `${getPossessive(step)} Height *`}
                </Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <Text style={[styles.title, { marginTop: 30 }]}>Weight</Text>
            <TouchableOpacity style={styles.dropdownInput} onPress={() => openPicker('weight', 'Select Weight', OPTIONS.weight)}>
                <Text style={weight ? styles.dropdownActiveText : styles.dropdownPlaceholderText}>
                    {weight || `${getPossessive(step)} Weight *`}
                </Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>
        </View>
    );

    const renderStepQualification = () => (
        <View style={styles.stepContent}>
            {renderHeaderIcon('qualification')}
            <Text style={styles.title}>Highest qualification</Text>
            <TouchableOpacity style={styles.dropdownInput} onPress={() => openPicker('qualification', 'Select Qualification', OPTIONS.qualification)}>
                <Text style={qualification ? styles.dropdownActiveText : styles.dropdownPlaceholderText}>
                    {qualification || `${getPossessive(step)} highest qualification`}
                </Text>
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
                    <TouchableOpacity style={styles.dropdownInputSmall} onPress={() => openPicker('zodiac', 'Select Zodiac', OPTIONS.zodiac)}>
                        <Text style={zodiac ? styles.dropdownActiveTextSmall : styles.dropdownPlaceholderText}>
                            {zodiac || 'Select'}
                        </Text>
                        <Ionicons name="caret-down" size={16} color="#1A1A1A" />
                    </TouchableOpacity>
                </View>
                <View style={styles.halfInput}>
                    <Text style={styles.inputSubTitle}>Star</Text>
                    <TouchableOpacity style={styles.dropdownInputSmall} onPress={() => openPicker('star', 'Select Star', OPTIONS.star)}>
                        <Text style={star ? styles.dropdownActiveTextSmall : styles.dropdownPlaceholderText}>
                            {star || 'Select'}
                        </Text>
                        <Ionicons name="caret-down" size={16} color="#1A1A1A" />
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
            <TouchableOpacity style={styles.dropdownInput} onPress={() => openPicker('income', 'Select Annual Income', OPTIONS.income)}>
                <Text style={income ? styles.dropdownActiveText : styles.dropdownPlaceholderText}>
                    {income || `${getPossessive(step)} annual income*`}
                </Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <Text style={[styles.title, { marginTop: 30 }]}>Work details</Text>
            <TouchableOpacity
                style={[styles.dropdownInput, { marginBottom: 20 }]}
                onPress={() => openPicker('worksWith', 'Works With', OPTIONS.worksWith)}
            >
                <Text style={worksWith ? styles.dropdownActiveText : styles.dropdownPlaceholderText}>
                    {worksWith || `${getPronoun()} works with`}
                </Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.dropdownInput}
                onPress={() => openPicker('worksAs', 'Works As', OPTIONS.worksAs)}
            >
                <Text style={worksAs ? styles.dropdownActiveText : styles.dropdownPlaceholderText}>
                    {worksAs || `${getPronoun()} works as`}
                </Text>
                <Ionicons name="caret-down" size={20} color="#1A1A1A" />
            </TouchableOpacity>
        </View>
    );

    const renderStepUploads = () => (
        <View style={styles.stepContent}>
            {renderHeaderIcon('details')}
            <Text style={styles.title}>Add Horoscope</Text>
            {horoscopeImage ? (
                <View style={styles.uploadBoxFull}>
                    <Image source={{ uri: horoscopeImage }} style={styles.uploadedFullImage} />
                    <TouchableOpacity style={styles.removeIconBadge} onPress={() => removeImage('horoscope')}>
                        <Ionicons name="close-circle" size={24} color="#FF4444" />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={styles.uploadBoxFull} onPress={() => pickImage('horoscope')}>
                    <View style={styles.plusBg}>
                        <Ionicons name="add" size={30} color="#000" />
                    </View>
                    <Text style={styles.uploadText}>Upload Image / PDF</Text>
                </TouchableOpacity>
            )}

            <Text style={[styles.title, { marginTop: 30 }]}>Add profile photo</Text>
            <View style={styles.profileUploadRow}>
                {[0, 1].map((idx) => (
                    <View key={idx} style={styles.uploadBoxHalfContainer}>
                        {profileImages[idx] ? (
                            <View style={styles.uploadBoxHalf}>
                                <Image source={{ uri: profileImages[idx]! }} style={styles.uploadedHalfImage} />
                                <TouchableOpacity style={styles.removeIconBadge} onPress={() => removeImage('profile', idx)}>
                                    <Ionicons name="close-circle" size={24} color="#FF4444" />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity style={styles.uploadBoxHalf} onPress={() => pickImage('profile', idx)}>
                                <View style={styles.plusBg}>
                                    <Ionicons name="add" size={30} color="#000" />
                                </View>
                                <Text style={styles.miniUploadText}>Click to add photo</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
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

    const renderPickerModal = () => (
        <Modal
            visible={pickerVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setPickerVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setPickerVisible(false)}
            >
                <View style={styles.pickerContainer}>
                    <View style={styles.pickerHeader}>
                        <Text style={styles.pickerTitle}>{pickerTitle}</Text>
                        <TouchableOpacity onPress={() => setPickerVisible(false)}>
                            <Ionicons name="close" size={24} color="#1A1A1A" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={pickerOptions}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.pickerOption}
                                onPress={() => handleSelect(item)}
                            >
                                <Text style={styles.pickerOptionText}>{item}</Text>
                                {(item === religion || item === community || item === livingIn ||
                                    item === state || item === city || item === subCommunity ||
                                    item === maritalStatus || item === height || item === weight ||
                                    item === qualification || item === zodiac || item === star ||
                                    item === income || item === worksWith || item === worksAs) &&
                                    <Ionicons name="checkmark" size={20} color="#FDBE01" />
                                }
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={styles.pickerList}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    );

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
            {renderPickerModal()}
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
        color: '#1A1A1A',
    },
    dropdownActiveTextSmall: {
        fontSize: 16,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
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
    uploadedFullImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        resizeMode: 'cover',
    },
    uploadedHalfImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        resizeMode: 'cover',
    },
    removeIconBadge: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: '#FFF',
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    uploadBoxHalfContainer: {
        width: '47%',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    pickerContainer: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        maxHeight: '70%',
        paddingBottom: 30,
    },
    pickerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    pickerTitle: {
        fontSize: 22,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    pickerList: {
        paddingHorizontal: 20,
    },
    pickerOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    pickerOptionText: {
        fontSize: 18,
        color: '#1A1A1A',
        fontFamily: serifFont,
    },
});
