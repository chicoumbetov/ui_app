import * as React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Animated, Dimensions, Platform,
} from 'react-native';

import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatePresence, MotiView } from 'moti';
import { useDimensions } from '@react-native-community/hooks';
import { Modal } from '@ui-kitten/components';
import Sheet from './Sheet';

export type ActionSheetProps = {
  title: string,
  subtitle?: string,
  children: React.ReactNode,
  before: React.ReactNode,
  noSafeArea: boolean,
  visible: boolean,
  scrollable: boolean,
  onClose?: () => void,
  rightAction?: {
    label: string,
    onPress: () => any
  }
};

type ActionSheetState = {
  animation: Animated.Value,
  visible: boolean
};

const ActionSheet = (props: ActionSheetProps) => {
  const {
    scrollable = false,
    noSafeArea = false,
    subtitle = undefined,
    rightAction = undefined,
    title, children, before, visible, onClose,
  } = props;
  const { screen } = useDimensions();
  const [visibleState, setVisible] = useState(visible);
  const [visibleModalState, setVisibleModal] = useState(visible);

  useEffect(() => {
    if (visible !== visibleState) {
      if (visible) {
        setVisible(visible);
        setVisibleModal(visible);
      } else {
        setVisible(visible);
      }
    }
  }, [visible]);

  const insets = useSafeAreaInsets();

  const onRequestClose = () => {
    if (onClose) {
      onClose();
    } else {
      setVisible(false);
    }
  };

  const computedStyles = styles.modal;

  return (
    <Modal
      onBackdropPress={onRequestClose}
      visible={visibleModalState}
      style={{ margin: 0, ...StyleSheet.absoluteFillObject }}
    >
      {
          before
        }
      <AnimatePresence onExitComplete={() => setVisibleModal(false)}>
        {visibleState && (
        <View style={computedStyles}>
          <MotiView
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: '#000000',
              flex: 1,
            }}
            from={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'timing',
              duration,
            }}
          >
            <TouchableOpacity style={styles.exit} onPress={onRequestClose} />

          </MotiView>
          <MotiView
            style={{
              paddingBottom: insets.bottom, maxWidth: 780, width: '100%', flex: 1, maxHeight: screen.height * 0.8,
            }}
            from={{ translateY: screen.height }}
            animate={{ translateY: 0 }}
            exit={{ translateY: screen.height }}
            transition={{
              type: 'timing',
              duration,
            }}
          >
            <Sheet {...{
              toggle: onRequestClose, title, subtitle, rightAction, noSafeArea, scrollable,
            }}
            >
              {children}
            </Sheet>
          </MotiView>
        </View>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default ActionSheet;

const duration = 350;
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  exit: {
    flex: 1,
  },
});
