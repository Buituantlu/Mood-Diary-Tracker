import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import localesResourse from '../assets/locales';
// import DeviceInfo from 'react-native-device-info';

// const languageDetector = {
//   type: 'languageDetector',
//   detect: () => DeviceInfo.getDeviceLocale(),
//   init: () => {},
//   cacheUserLanguage: () => {},
// };

// const languageDetector = {
//   type: 'languageDetector',
//   async: true,
//   detect: cb => cb('vi'),
//   init: () => {},
//   cacheUserLanguage: () => {},
// };
const LANGUAGE_KEY = 'language_key';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    const selectLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (selectLanguage === undefined) {
      callback('en');
    } else {
      callback(selectLanguage);
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    fallbackLng: 'en',
    resources: localesResourse,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
      wait: true,
    },
  });

export default i18n;
