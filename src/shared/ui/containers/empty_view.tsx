import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import AppStyle from '../styles/app.style';

type EmptyViewProps = {
  icon: ImageSourcePropType;
  content?: string;
};

const EmptyView = ({icon, content}: EmptyViewProps) => {
  return (
    <View style={styles.emptyContainer}>
      <Image style={styles.imageBackground} source={icon} />
      <Text numberOfLines={2} style={styles.textTitle}>
        {content}
      </Text>
    </View>
  );
};

export default EmptyView;

const styles = StyleSheet.create({
  imageBackground: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    tintColor: AppStyle.TextColor.Secondary,
  },
  textTitle: {
    textAlign: 'center',
    color: AppStyle.TextColor.Secondary,
    fontSize: AppStyle.Text.Medium2,
    width: AppStyle.Screen.FullWidth - 96,
    marginTop: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
