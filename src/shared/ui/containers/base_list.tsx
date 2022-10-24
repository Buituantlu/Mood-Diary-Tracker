import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import AppStyle from '../styles/app.style';

type BaseListTypes<ItemT> = {
  data?: Array<ItemT>;
  renderItemElement: ({
    item,
    index,
  }: {
    item: ItemT;
    index: number;
  }) => JSX.Element;
  onRefresh?: () => void;
  onEndReached?: () => void;
  onScroll?: () => void;
  moreStyle?: ViewStyle;
  isLoadingData?: boolean;
};

const BaseList = <ItemT,>({
  data,
  renderItemElement,
  onRefresh,
  onEndReached,
  onScroll,
  moreStyle,
  isLoadingData,
}: BaseListTypes<ItemT>) => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        renderItem={renderItemElement}
        showsVerticalScrollIndicator={false}
        data={data}
        numColumns={1}
        maxToRenderPerBatch={20}
        initialNumToRender={20}
        keyExtractor={(item, idx) => `item-list-${idx}`}
        style={styles.listStyle}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
        scrollEventThrottle={50}
        contentContainerStyle={[
          styles.contentContainerStyle,
          moreStyle && moreStyle,
        ]}
        onScroll={onScroll}
      />
      <ActivityIndicator
        style={styles.indicator}
        size="large"
        animating={!isLoadingData ? false : true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 150 + getBottomSpace(),
    backgroundColor: AppStyle.BGColor.Main,
    paddingTop: 8,
  },
  listStyle: {},
  indicator: {
    alignSelf: 'center',
    color: 'white',
    position: 'absolute',
    top: AppStyle.Screen.FullHeight / 3,
  },
});
export default BaseList;
