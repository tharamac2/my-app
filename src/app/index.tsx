import { Redirect } from 'expo-router';

export default function Index() {
    // Direct user to the welcome screen initially
    // In a real app, this would check authentication state first
    return <Redirect href="/welcome" />;
}
