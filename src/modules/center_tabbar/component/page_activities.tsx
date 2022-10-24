import {observer} from 'mobx-react';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import MoodStore from '../../../shared/store/moodStore';
import UIStore from '../../../shared/store/ui';
import ItemActivities from './item_activities';

interface PageActivitiesProps {
  moodStore: MoodStore;
  data: any;
  isEdit?: boolean;
  mood?: any;
  uiStore: UIStore;
}

const PageActivities = observer(
  ({data, moodStore, isEdit, mood, uiStore}: PageActivitiesProps) => {
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          columnWrapperStyle={{justifyContent: 'space-evenly'}}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ItemActivities
              uiStore={uiStore}
              mood={mood}
              isEdit={isEdit}
              moodStore={moodStore}
              item={item}
            />
          )}
          scrollEnabled={false}
          numColumns={5}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  },
);

export default PageActivities;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
