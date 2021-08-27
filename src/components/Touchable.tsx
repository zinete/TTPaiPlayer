/* eslint-disable react-hooks/exhaustive-deps */
/**
 * @ Author: zhenghui
 * @ Create Time: 2021-03-29 11:11:47
 * @ Modified by: zhenghui
 * @ Modified time: 2021-08-27 17:09:24
 * @ Description: 建议所有点击事件调用此组件
 */
import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import _ from 'lodash';

const Touchable: React.FC<TouchableOpacityProps> = React.memo(
  ({style, onPress, ...rest}) => {
    const touchableStyle = rest.disabled ? [style, styles.disabled] : style;
    let throttleOnPress;
    if (typeof onPress === 'function') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      throttleOnPress = React.useCallback(
        _.throttle(onPress, 1000, {leading: true, trailing: false}),
        [onPress],
      );
    }
    return (
      <TouchableOpacity
        hitSlop={styles.hislop}
        onPress={throttleOnPress}
        style={touchableStyle}
        activeOpacity={0.8}
        {...rest}
      />
    );
  },
);

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  hislop: {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
  },
});

export default Touchable;
