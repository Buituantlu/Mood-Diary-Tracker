/* eslint-disable react-native/no-inline-styles */
import {reaction} from 'mobx';
import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import activitiesDataEn from '../../../assets/json/en/activities.json';
import UIStore from '../../../shared/store/ui';
import UserStore from '../../../shared/store/user';
import BaseHeader from '../../../shared/ui/containers/base_header';
import MainView from '../../../shared/ui/containers/main_view';
import AppStyle from '../../../shared/ui/styles/app.style';
import i18n from '../../../utils/i18n';
import {
  ic_breakfast,
  ic_lunch,
  ic_dinner,
  ic_water,
  ic_tea,
  ic_fruits,
  ic_nuts,
  ic_seafood,
  ic_whole_grain,
  ic_no_sugar,
  ic_saturated_fat,
  ic_eat_less_salt,
  ic_take_vitamins,
  ic_breath_slowly,
  ic_brush_teeth,
  ic_groom_myself,
  ic_enjoy_shower,
  ic_write_things_down,
  ic_read,
  ic_power_nap,
  ic_get_full_night_sleep,
  ic_internet_break,
  ic_music,
  ic_talk_myself,
  ic_tidy_up,
  ic_light_exercise,
  ic_make_my_bed,
  ic_stretch,
  ic_a_walk_per_day,
  ic_try_yoga,
  ic_meditate,
  ic_sport_event,
  ic_check_my_health,
  ic_get_cooking,
  ic_work_secret_project,
  ic_try_DIY,
  ic_be_an_artist,
  ic_make_everything_game,
  ic_quote_day,
  ic_party_party,
  ic_travel_myself,
  ic_plan_tree,
  ic_teach_my_pet,
  ic_volunteer_work,
  ic_talk_parents,
  ic_reconnect_friends,
  ic_join_club,
  ic_travel,
  ic_romantic_date,
  ic_visit_relatives,
  ic_talk_with_someone,
  ic_love_pet,
  ic_learn_language,
  ic_learn_craft,
  ic_hone_my_skill,
  ic_musical_instrument,
  ic_commit_my_plan,
  ic_work_hard,
  ic_inbox_zero,
  ic_manage_life,
  ic_list_to_do,
  ic_list_not_to_do,
  ic_try_again,
  bg_header_eat_healthy,
  bg_header_self_relaxation,
  bg_header_be_active,
  bg_header_be_little_crazy,
  bg_header_connect_others,
  bg_header_self_improvement,
  IC_ADD,
  ic_arrow_left_orange,
  IC_TABBAR_ADD_BLUE,
} from '../../../utils/icons';

const images = {
  ic_breakfast,
  ic_lunch,
  ic_dinner,
  ic_water,
  ic_tea,
  ic_fruits,
  ic_nuts,
  ic_seafood,
  ic_whole_grain,
  ic_no_sugar,
  ic_saturated_fat,
  ic_eat_less_salt,
  ic_take_vitamins,
  ic_breath_slowly,
  ic_brush_teeth,
  ic_groom_myself,
  ic_enjoy_shower,
  ic_write_things_down,
  ic_read,
  ic_power_nap,
  ic_get_full_night_sleep,
  ic_internet_break,
  ic_music,
  ic_talk_myself,
  ic_tidy_up,
  ic_light_exercise,
  ic_make_my_bed,
  ic_stretch,
  ic_a_walk_per_day,
  ic_try_yoga,
  ic_meditate,
  ic_sport_event,
  ic_check_my_health,
  ic_get_cooking,
  ic_work_secret_project,
  ic_try_DIY,
  ic_be_an_artist,
  ic_make_everything_game,
  ic_quote_day,
  ic_party_party,
  ic_travel_myself,
  ic_plan_tree,
  ic_teach_my_pet,
  ic_volunteer_work,
  ic_talk_parents,
  ic_reconnect_friends,
  ic_join_club,
  ic_travel,
  ic_romantic_date,
  ic_visit_relatives,
  ic_talk_with_someone,
  ic_love_pet,
  ic_learn_language,
  ic_learn_craft,
  ic_hone_my_skill,
  ic_musical_instrument,
  ic_commit_my_plan,
  ic_work_hard,
  ic_inbox_zero,
  ic_manage_life,
  ic_list_to_do,
  ic_list_not_to_do,
  ic_try_again,
  bg_header_eat_healthy,
  bg_header_self_relaxation,
  bg_header_be_active,
  bg_header_be_little_crazy,
  bg_header_connect_others,
  bg_header_self_improvement,
};

interface ChallengeDetailScreenProps {
  uiStore: UIStore;
  userStore: UserStore;
  navigation: any;
  route: any;
}

const ChallengeDetailScreen = observer(
  ({route, navigation, uiStore, userStore}: ChallengeDetailScreenProps) => {
    reaction(
      () => uiStore.language,
      language => {
        i18n.changeLanguage(language);
      },
    );

    useEffect(() => {
      i18n.changeLanguage(uiStore.language);
    }, [uiStore.language]);
    const [listChallenge, setListChallenge] = useState();
    const {challengeData} = route.params;
    const getListChallenge = async () => {
      const result = await activitiesDataEn.filter(a =>
        challengeData.activities.includes(a.id),
      );
      // .map(a => a);
      setListChallenge(result);
    };

    useEffect(() => {
      getListChallenge();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const ItemChallenge = props => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('NewChallenge', {
              valueChallenge: {
                image: props.image,
                name: props.image,
              },
            })
          }
          style={[
            styles.boxItem,
            {
              backgroundColor:
                uiStore.bgMode === 'light'
                  ? AppStyle.BGColor.White
                  : AppStyle.BGColor.BGDarkMode,
            },
          ]}>
          <View style={styles.boxImg}>
            <Image style={styles.imgItem} source={images[props.image]} />
          </View>
          <View style={styles.boxTxtItem}>
            <Text style={styles.txtTitleItem}>
              {i18n.t(`challenges.${props.image}`)}
            </Text>
            <Text style={styles.txtDetailItem}>{i18n.t(props.image)}</Text>
          </View>
          <Image
            style={styles.imgAdd}
            source={uiStore.bgMode === 'light' ? IC_ADD : IC_TABBAR_ADD_BLUE}
          />
        </TouchableOpacity>
      );
    };

    return (
      <MainView
        childView={
          <View style={styles.container}>
            <BaseHeader
              leftAction={() => navigation.goBack()}
              leftElement={
                <Image
                  style={[
                    styles.leftElementStyle,
                    {
                      tintColor:
                        uiStore.bgMode === 'light'
                          ? AppStyle.MoreColors.OrangeMain
                          : AppStyle.MoreColors.BlueMain,
                    },
                  ]}
                  source={ic_arrow_left_orange}
                />
              }
            />
            <View style={styles.headerStyle}>
              <ImageBackground
                style={styles.imgHeader}
                source={images[challengeData.largeImage]}>
                <View style={styles.titleHeader}>
                  <Text style={styles.txtTitleHeader}>
                    {i18n.t(`challenges.${challengeData.largeImage}`)}
                  </Text>
                  <Text style={styles.txtDetailHeader}>
                    {i18n.t(challengeData.largeImage)}
                  </Text>
                </View>
              </ImageBackground>
              <View>
                <ScrollView
                  style={styles.wrapperMain}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{paddingBottom: height * 0.42}}>
                  {listChallenge?.map(item => {
                    return (
                      <ItemChallenge
                        key={item.id}
                        image={item.image}
                        name={item.name}
                        description={item.description}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </View>
        }
        uiStore={uiStore}
      />
    );
  },
);

export default ChallengeDetailScreen;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  leftElementStyle: {
    width: 20,
    height: 20,
  },
  headerStyle: {
    width: width,
    height: height * 0.28,
  },
  imgHeader: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  titleHeader: {
    width: width * 0.75,
    height: 100,
    marginLeft: 10,
  },
  txtTitleHeader: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2a2d29',
    marginBottom: 8,
  },
  txtDetailHeader: {
    fontSize: 14,
    color: '#434343',
    fontFamily: 'Quicksand-SemiBold',
  },
  wrapperMain: {
    width: width,
    height: height,
    padding: 10,
  },
  boxItem: {
    width: '100%',
    height: 75,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },
  boxImg: {
    width: 60,
    height: 50,
    marginLeft: 5,
    marginRight: 20,
    borderRightWidth: 1,
    borderRightColor: '#d8d8d8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgItem: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  boxTxtItem: {
    width: '65%',
  },
  txtTitleItem: {
    fontSize: 15,
  },
  txtDetailItem: {
    marginTop: 3,
    fontSize: 12,
  },
  imgAdd: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 15,
  },
});
