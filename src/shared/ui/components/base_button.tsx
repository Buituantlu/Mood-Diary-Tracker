import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ImageStyle,
  ViewStyle,
  Pressable,
} from 'react-native';
import AppStyle from '../styles/app.style';

type BaseButtonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  titleStyle?: StyleProp<TextStyle>;
  icon?: any;
  title?: string;
  isDisable?: boolean;
  action: () => void;
};

const BaseButton: React.FC<BaseButtonProps> = React.memo(
  ({
    containerStyle,
    iconStyle,
    titleStyle,
    icon,
    title,
    isDisable,
    action,
  }: BaseButtonProps) => {
    return (
      <TouchableOpacity
        disabled={isDisable}
        style={[styles.container, containerStyle]}
        onPress={action}>
        {icon && (
          <Image
            resizeMethod="scale"
            resizeMode="cover"
            source={icon}
            defaultSource={icon}
            style={[styles.icon, iconStyle]}
          />
        )}
        {title && <Text style={[styles.text, titleStyle]}>{title}</Text>}
      </TouchableOpacity>
    );
  },
);

export default BaseButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    fontSize: AppStyle.Text.Min,
    alignSelf: 'center',
  },
});
