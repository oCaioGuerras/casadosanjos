import {TestIds} from 'react-native-google-mobile-ads';
import {Platform} from 'react-native';
import {API_URL, ONE_SIGNAL_APP_ID, FIREBASE_DATABASE_URL} from '@env';
export const config = {
  apiURL: API_URL,
  colors: {
    violet: '#775CCE',
    purple: '#4F2FB0',
    zinc: '#727272',
    white: '#FFFFFF',
    black: '#000000',
    background: '#F2F2F2',
  },
  oneSignal: {
    appId: ONE_SIGNAL_APP_ID,
  },
  firebase: {
    databaseURL: FIREBASE_DATABASE_URL,
  },
  checkin: {
    points: 50,
    AdUnitId: __DEV__
      ? TestIds.REWARDED
      : Platform.OS === 'android'
      ? 'ca-app-pub-2051085646472320/8258373470'
      : TestIds.REWARDED,
  },
  bannerAdUnitId: __DEV__
    ? TestIds.BANNER
    : Platform.OS === 'android'
    ? 'ca-app-pub-2051085646472320/1828195486'
    : TestIds.BANNER,
  interstitialAdUnitId: __DEV__
    ? TestIds.INTERSTITIAL
    : Platform.OS === 'android'
    ? 'ca-app-pub-2051085646472320/7462080364'
    : TestIds.INTERSTITIAL,
};
