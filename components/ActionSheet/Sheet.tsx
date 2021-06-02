// @flow
import * as React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Constants from 'expo-constants';

// import {StyleGuide, type StyleProps} from "./theme/index";
import { Icon, Text } from '@ui-kitten/components';
// import Text from './Text';
// import Icon from "./Icon/index";
// import {withBreakpoints} from "../Helpers/Breakpoints";

export type SheetProps = {
  title: string,
  subtitle?: string,
  children: React.ReactNode,
  noSafeArea: boolean,
  scrollable: boolean,
  rightAction?: {
    label: string,
    onPress: () => void
  },
  // toggle: () => mixed
};

class Sheet extends React.PureComponent<SheetProps> {
  static defaultProps = {
    noSafeArea: false,
    scrollable: false,
  };

  render(): React.ReactNode {
    const {
      toggle, title, subtitle, rightAction, noSafeArea, scrollable,
    } = this.props;
    const children = noSafeArea
      ? this.props.children
      : <SafeAreaView>{this.props.children}</SafeAreaView>;

    const computedContentStyle = {};

    return (
      <View style={[styles.content, computedContentStyle]}>
        <TouchableWithoutFeedback onPress={toggle} style={{ flexShrink: 0, flex: 0 }}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.left} onPress={toggle}>
              <Icon name="arrow-ios-downward-outline" fill="black" />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        {scrollable ? (<ScrollView bounces={false}>{children}</ScrollView>) : children}
      </View>
    );
  }
}

export default Sheet;

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: StyleGuide.spacing.small,
    // paddingVertical: StyleGuide.spacing.tiny,
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    height: 40,
  },
  left: {
    width: 36,
  },
  center: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
  },
  right: {
    minWidth: 36,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
