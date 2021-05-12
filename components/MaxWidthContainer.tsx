/**
 * Container component to cover dummy components
 *
 * @author: David-Julian Buch
 */

import * as React from 'react';
import {
  ScrollView, ScrollViewProps, View, ViewProps, StyleSheet,
} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

type MaxWidthContainerProps = ({
  withScrollView?: 'simple';
  outerViewProps?: ScrollViewProps; } | {
  withScrollView: 'keyboardAware';
  outerViewProps?: KeyboardAwareScrollViewProps; } | {
  withScrollView: false;
  outerViewProps?: ViewProps; }) & {
  innerViewProps?: ViewProps;
  children?: React.ReactNode
};

type OuterViewType = typeof View | typeof ScrollView | typeof KeyboardAwareScrollView;
type OuterViewPros = ViewProps | ScrollViewProps | KeyboardAwareScrollViewProps;

export default function MaxWidthContainer(props: MaxWidthContainerProps): JSX.Element {
  const {
    withScrollView, outerViewProps, innerViewProps, children,
  } = props;
  /**
   First option around dummy data - View
   */
  let OuterView: OuterViewType = View;
  let finalOuterProps: OuterViewPros = {};
  /**
   Second and third options around dummy data - ScrollView or KeyboardAwareScrollView
   */
  if (withScrollView === undefined || withScrollView === 'simple') {
    OuterView = ScrollView;
  } else if (withScrollView === 'keyboardAware') {
    OuterView = KeyboardAwareScrollView;
  }

  /**
   Applied style depending on boolean of withScrollView
   */
  if (withScrollView === false) {
    /**
    ____
     */
    const { style: outerViewStyle, ...otherOuterViewProps } = outerViewProps || {};
    const finalOuterViewStyle = StyleSheet.flatten([
      styles.outerBaseStyle,
      { flex: 1 },
      outerViewStyle,
    ]);
    finalOuterProps = { style: finalOuterViewStyle, ...otherOuterViewProps };
  } else {
    const {
      contentContainerStyle: outerViewStyle,
      ...otherOuterViewProps
    } = outerViewProps as ScrollViewProps || {};
    const finalOuterViewStyle = StyleSheet.flatten([
      styles.outerBaseStyle,
      outerViewStyle,
    ]);
    finalOuterProps = { contentContainerStyle: finalOuterViewStyle, ...otherOuterViewProps };
  }

  /**
   Apply styles anyway
   */
  const { style: innerViewStyle, ...otherInnerViewProps } = innerViewProps || {};

  const finalInnerViewStyle = StyleSheet.flatten([
    styles.innerBaseStyle,
    innerViewStyle,
  ]);

  return (
    <OuterView
      {...finalOuterProps}
    >
      <View
        style={finalInnerViewStyle}
        {...otherInnerViewProps}
      >
        {children}
      </View>
    </OuterView>
  );
}

const styles = StyleSheet.create({
  outerBaseStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerBaseStyle: {
    maxWidth: 780,
    flex: 1,
  },
});
