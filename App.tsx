/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import OneSignal from 'react-native-onesignal';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import analytics from '@react-native-firebase/analytics';
import {
  Home,
  Login,
  FiveCuriosities,
  Intro,
  Chat,
  Ranking,
} from './src/screens';
import {Header} from './src/components';
import {config} from './config';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function App(): JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }

    if (user) {
      database()
        .ref(`/users/${user.uid}`)
        .on('value', snapshot => {
          const points = snapshot.val().points;
          const name = snapshot.val().name;
          const checkins = snapshot.val().checkins;
          const lastCheckinAt = snapshot.val().lastCheckinAt;
          const createdAt = snapshot.val().createdAt;
          const updateUserData = {
            user,
            points,
            name,
            checkins,
            lastCheckinAt,
            createdAt,
          };
          setUser(updateUserData);
        });
    }
  }

  useEffect(() => {
    analytics().logEvent('app_opened');
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  OneSignal.setAppId(config.oneSignal.appId);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user ? (
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
              tabBarStyle: styles.barStyle,
              tabBarHideOnKeyboard: true,
              tabBarActiveTintColor: config.colors.black,
              tabBarInactiveTintColor: config.colors.zinc,
              headerShown: true,
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
              headerTintColor: config.colors.black,
              headerTitleAlign: 'center',
              headerTitle: 'Casa dos Anjos',
              freezeOnBlur: true,
              header: () => <Header user={user} />,
            }}>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons
                    name="dog"
                    color={config.colors.zinc}
                    size={26}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Chat"
              component={Chat}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons
                    name="chat"
                    color={config.colors.zinc}
                    size={26}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="5 Curiosidades"
              component={FiveCuriosities}
              options={{
                tabBarBadge: 5,
                tabBarIcon: () => (
                  <MaterialCommunityIcons
                    name="gamepad-variant"
                    color={config.colors.zinc}
                    size={26}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Ranking"
              component={Ranking}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons
                    name="trophy"
                    color={config.colors.zinc}
                    size={26}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    position: 'absolute',
    backgroundColor: config.colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    height: 60,
  },
  headerStyle: {
    backgroundColor: config.colors.white,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    fontSize: 20,
  },
});

export default App;
