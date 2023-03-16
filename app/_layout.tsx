import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { ThemeProvider } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Text } from 'react-native'
import { Host } from 'react-native-portalize'

import Theme from '../constants/Theme';
import { store } from '../hooks/store';
import ProfileAvatarHeader from '../components/ProfileAvatar';
import HeaderBackButton from '../components/BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  NavigationBar.setVisibilityAsync('visible');
  NavigationBar.setBackgroundColorAsync(Colors.tab_bar);

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Montserrat_Bold: require('../assets/fonts/Montserrat-Bold.ttf'),
    Montserrat_Light: require('../assets/fonts/Montserrat-Light.ttf'),
    Montserrat_Medium: require('../assets/fonts/Montserrat-Medium.ttf'),
    Montserrat_Regular: require('../assets/fonts/Montserrat-Regular.ttf'),
    Montserrat_Semibold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    Futura_Bold: require('../assets/fonts/Futura-Bold.ttf'),
    SF_Pro_Heavy: require('../assets/fonts/SF-Pro-Text-Heavy.otf'),
    SF_Pro_Ultralight: require('../assets/fonts/SF-Pro-Text-Ultralight.otf'),
    SF_Pro_Light: require('../assets/fonts/SF-Pro-Text-Light.otf'),
    SF_Pro_Medium: require('../assets/fonts/SF-Pro-Text-Medium.otf'),
    SF_Pro_Regular: require('../assets/fonts/SF-Pro-Text-Regular.otf'),
    SF_Pro_Semibold: require('../assets/fonts/SF-Pro-Text-Semibold.otf'),
    SF_Pro_Bold: require('../assets/fonts/SF-Pro-Text-Bold.otf'),
    SF_Pro_Black: require('../assets/fonts/SF-Pro-Text-Black.otf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

const HeaderAlt = () => {
  return (
    <SafeAreaView style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'center', marginTop: 15}}>
      <HeaderBackButton />
      <Text style={{ fontFamily: 'Futura_Bold', color: 'white', fontSize: 22 }}>cinemaCo.</Text>
      <ProfileAvatarHeader />
    </SafeAreaView>
  );
}

const HeaderAlt2 = () => {
  return (
    <SafeAreaView style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'center', marginTop: 15}}>
      <HeaderBackButton />
      <ProfileAvatarHeader />
    </SafeAreaView>
  );
}

function RootLayoutNav() {

  return (
    <>
      <ThemeProvider value={Theme}>
        <Provider store={store}>
        <Host>
        <Stack screenOptions={{
          headerTransparent: true,
          gestureDirection: 'horizontal', 
          gestureEnabled: true, 
          animationTypeForReplace: 'pop',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ /*header: () => <Header /> ,*/ headerShown: true, headerTitle: () => null }}/>
          <Stack.Screen name='movie_info' options={{ presentation: 'modal', animation: 'slide_from_bottom', header: () => <HeaderAlt2 />,  }} />
        </Stack>
        </Host>
        </Provider>
      </ThemeProvider>
    </>
  );
}
