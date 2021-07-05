import * as React from 'react';
import {
  View, TextInput, Pressable, Platform,
} from 'react-native';
import { useState } from 'react';
import {
  StyleService, Text, useStyleSheet, Modal,
} from '@ui-kitten/components';
import { FalsyText } from '@ui-kitten/components/devsupport';
import { useForwardedRef } from '../../utils/CustomHooks';
import { TextInputFormProps } from './types';

export type DigitsInputFormProps = Exclude<TextInputFormProps, 'placeholder'> & {
  numberOfDigits: number;
};

const DigitsInput = React.forwardRef<TextInput, DigitsInputFormProps>(
  (props: DigitsInputFormProps, ref): React.ReactElement => {
    const {
      onChangeValue,
      containerStyle,
      numberOfDigits,
      onSubmitEditing,
      label,
      labelStyle,
      error,
    } = props;

    const styles = useStyleSheet(themedStyles);

    const [inputValue, setInputValue] = useState<string>('');
    const [containerIsFocused, setContainerIsFocused] = useState(false);

    const safeRef = useForwardedRef<TextInput>(ref);

    const codeDigitsArray = new Array(numberOfDigits).fill(0);

    const toDigitInput = (_value: number, idx: number) => {
      const emptyInputChar = ' ';
      const digit = inputValue[idx] || emptyInputChar;

      const isCurrentDigit = idx === inputValue.length;
      const isLastDigit = idx === numberOfDigits - 1;
      const isCodeFull = inputValue.length === numberOfDigits;

      const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

      const inputContainerStyle = containerIsFocused && isFocused
        ? [styles.inputContainer, styles.inputContainerFocused]
        : styles.inputContainer;

      return (
        <View key={idx} style={[inputContainerStyle]}>
          <Text category="p1" style={styles.inputText}>{digit}</Text>
        </View>
      );
    };
    const handleOnPress = () => {
      setContainerIsFocused(true);
      safeRef?.current?.focus();
    };

    const handleOnBlur = () => {
      setContainerIsFocused(false);
      safeRef?.current?.blur();
    };

    return (
      <View style={[styles.container, containerStyle]}>
        <FalsyText
          category="label"
          style={[styles.label, labelStyle]}
          component={label}
        />
        <Modal
          visible={containerIsFocused && inputValue.length < numberOfDigits}
          backdropStyle={{ backgroundColor: 'transparent' }}
          onBackdropPress={handleOnBlur}
        />
        <View style={{ alignItems: 'center' }}>
          <Pressable
            style={[
              styles.inputsContainer,
            ]}
            onPress={handleOnPress}
          >
            {codeDigitsArray.map(toDigitInput)}
          </Pressable>
        </View>
        <TextInput
          ref={safeRef}
          value={inputValue}
          onChangeText={(text) => {
            const trimText = text.replace(/[^0-9]/g, '');
            setInputValue(trimText);
            if (onChangeValue) {
              onChangeValue(trimText);
            }
          }}
          keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
          returnKeyType="done"
          textContentType="oneTimeCode"
          maxLength={numberOfDigits}
          style={styles.hiddenCodeInput}
          onSubmitEditing={(e) => {
            handleOnBlur();
            if (onSubmitEditing) {
              onSubmitEditing(e);
            }
          }}
        />
        <FalsyText
          status={error && error.message ? 'danger' : ''}
          component={error && error.message}
        />
      </View>
    );
  },
);

DigitsInput.displayName = 'DigitsInput';

export default DigitsInput;

const themedStyles = StyleService.create({
  container: {
    marginVertical: 8,
  },
  hiddenCodeInput: {
    marginTop: -1,
    height: 1,
    width: 1,
    opacity: 0,
  },

  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    borderColor: 'border-basic-color-1',
    backgroundColor: 'background-basic-color-1',
    paddingHorizontal: 8,
    minHeight: 'size-medium',
    // @ts-ignore
    borderRadius: 'border-radius',
    // @ts-ignore
    borderWidth: 'border-width',
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 'size-medium',
    marginHorizontal: 7,
    shadowColor: 'rgba(190, 190, 190, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 2,
  },
  inputContainerFocused: {
    borderColor: 'color-primary-default',
    backgroundColor: 'background-basic-color-1',
  },
  inputText: {
    fontWeight: 'normal',
    color: 'text-basic-color',
  },
  label: {
    color: 'text-hint-color',
  },
});
