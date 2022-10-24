import * as React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Platform,
} from 'react-native';
import UIStore from '../../../shared/store/ui';
import Onboarding from 'react-native-onboarding-swiper';
import {
  IMG_INTRODUCE_0,
  IMG_INTRODUCE_1,
  IMG_INTRODUCE_2,
  IMG_INTRODUCE_3,
} from '../../../utils/icons';
import {useRef, useState, useEffect} from 'react';
import AppStyle from '../../../shared/ui/styles/app.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FISRT_USEAPP_KEY} from '../../../utils/constants';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

interface IntroScreenProps {
  uiStore: UIStore;
  navigation: any;
  rootNavigation: NavigationProp<ParamListBase>;
}

const IntroScreen = ({
  uiStore,
  navigation,
  rootNavigation,
}: IntroScreenProps) => {
  const [process, setProcess] = useState(0);
  const [count, setCount] = useState(0);

  const LIST_PROGRESS = [
    {
      id: 0,
      width: count == 0 ? `${process}%` : '100%',
    },
    {
      id: 1,
      width: count == 1 ? `${process}%` : count > 1 ? '100%' : '0%',
    },
    {
      id: 2,
      width: count == 2 ? `${process}%` : count > 2 ? '100%' : '0%',
    },
    {
      id: 3,
      width: count == 3 ? `${process}%` : '0%',
    },
  ];

  const onboardingRef = useRef<Onboarding>();
  useEffect(() => {
    if (Platform.OS === 'ios') {
      let num = 0;
      let runProgress = setInterval(() => {
        if (num > 100 && count < 3) {
          clearInterval(runProgress);
          setCount(count + 1);
          onboardingRef.current?.goNext();
        } else if (num < 100 || count < 3) {
          num = num + 1;
          setProcess(num);
        }
      }, 30);
      return () => {
        clearInterval(runProgress);
      };
    } else {
      let num = 0;
      let runProgress = setInterval(() => {
        if (num > 100 && count < 3) {
          clearInterval(runProgress);
          setCount(count + 1);
          onboardingRef.current?.goNext();
        } else if (num < 100 || count < 3) {
          num = num + 2;
          setProcess(num);
        }
      }, 30);
      return () => {
        clearInterval(runProgress);
      };
    }
  }, [count]);

  const onPress = () => {
    AsyncStorage.setItem(`${FISRT_USEAPP_KEY}`, '1');
  };

  const ItemProgress = props => {
    return (
      <View style={styles.progressBar}>
        <Animated.View
          style={[
            styles.animatedStyle,
            {
              width: props.width,
            },
          ]}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.boxMain} pointerEvents="none">
        <View style={styles.wrapperProgress}>
          {LIST_PROGRESS.map(item => {
            return <ItemProgress key={item.id} width={item.width} />;
          })}
        </View>
        <Onboarding
          showPagination={false}
          bottomBarHighlight={false}
          ref={onboardingRef}
          pages={[
            {
              backgroundColor: '#fff',
              image: (
                <SafeAreaView style={styles.wrapper}>
                  <Text style={styles.textHeader}>Ready to shine</Text>
                  <Image
                    style={styles.img_onboarding}
                    source={IMG_INTRODUCE_0}
                  />
                </SafeAreaView>
              ),
              title: '',
              subtitle: '',
            },
            {
              backgroundColor: '#fff',
              image: (
                <SafeAreaView style={styles.wrapper}>
                  <Text style={styles.textHeader1}>
                    Run your way and record your feelings of your day in every
                    step.
                  </Text>
                  <Image
                    style={styles.img_onboarding}
                    source={IMG_INTRODUCE_1}
                  />
                </SafeAreaView>
              ),
              title: '',
              subtitle: '',
            },
            {
              backgroundColor: '#fff',
              image: (
                <SafeAreaView style={styles.wrapper}>
                  <Text style={styles.textHeader1}>
                    Track your daily mood to know more about your inner-self.
                  </Text>
                  <Image
                    style={styles.img_onboarding}
                    source={IMG_INTRODUCE_2}
                  />
                </SafeAreaView>
              ),
              title: '',
              subtitle: '',
            },
            {
              backgroundColor: '#fff',
              image: (
                <SafeAreaView style={styles.wrapper}>
                  <Text style={styles.textHeader2}>
                    Sometimes to handle your negative emotions, you need to
                    leave your comfort zone and accept all challenges that come
                    along your way.
                  </Text>
                  <Image
                    style={styles.img_onboarding2}
                    source={IMG_INTRODUCE_3}
                  />
                </SafeAreaView>
              ),
              title: '',
              subtitle: '',
            },
          ]}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          onPress();
          navigation.navigate('InfoUser');
        }}
        style={styles.btn}>
        <Text style={styles.txtBtn}>Get started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    width: AppStyle.Screen.FullWidth,
    height: AppStyle.Screen.FullHeight * 0.95,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  boxMain: {
    alignItems: 'center',
    height: AppStyle.Screen.FullHeight,
  },
  wrapper: {
    width: AppStyle.Screen.FullWidth,
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  wrapperProgress: {
    flexDirection: 'row',
    width: AppStyle.Screen.FullWidth * 0.9,
  },
  progressBar: {
    height: 3,
    marginTop: 20,
    borderRadius: 5,
    marginHorizontal: 1,
    flexDirection: 'row',
    width: AppStyle.Screen.FullWidth * 0.225,
    backgroundColor: AppStyle.MoreColors.iosThumbBackGround,
  },
  animatedStyle: {
    backgroundColor: AppStyle.MoreColors.Orange,
  },
  btn: {
    width: AppStyle.Screen.FullWidth * 0.5,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 30,
    marginTop: -AppStyle.Screen.FullWidth * 0.35,
  },
  txtBtn: {
    fontSize: 16,
    fontWeight: '600',
    color: AppStyle.TextColor.White,
  },
  img_onboarding: {
    resizeMode: 'contain',
    width: AppStyle.Screen.FullWidth * 0.8,
    height: AppStyle.Screen.FullHeight * 0.5,
  },
  img_onboarding2: {
    resizeMode: 'contain',
    width: AppStyle.Screen.FullWidth * 0.8,
    height: AppStyle.Screen.FullHeight * 0.4,
  },
  textHeader: {
    fontSize: 28,
    fontWeight: '600',
    width: AppStyle.Screen.FullWidth * 0.9,
    height: 100,
    textAlign: 'center',
    marginTop: 40,
  },
  textHeader1: {
    fontSize: 24,
    fontWeight: '600',
    width: AppStyle.Screen.FullWidth * 0.9,
    height: 100,
    textAlign: 'center',
    marginTop: 40,
  },
  textHeader2: {
    fontSize: 20,
    fontWeight: '600',
    width: AppStyle.Screen.FullWidth * 0.9,
    height: 150,
    textAlign: 'center',
    marginTop: 40,
  },
});
