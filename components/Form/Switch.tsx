import * as React from 'react';
import {
  View,
  StyleSheet,
  TextStyle,
  ViewStyle,
  Switch as SwitchOriginal,
  SwitchProps,
  StyleProp,
} from 'react-native';
import { FieldError } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Text from '../Text';
import { ChangeValueCallbackType } from './Form';

export type SwitchFormProps = {
  name: string;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  error?: FieldError | undefined;
  style?: StyleProp<ViewStyle>;
  onChangeValue?: ChangeValueCallbackType;
} & SwitchProps;

const Switch = React.forwardRef<SwitchOriginal, SwitchFormProps>(
  (props: SwitchFormProps, ref): React.ReactElement => {
    const {
      label, labelStyle, error, style, onChangeValue, value, ...switchProps
    } = props;

    const [isEnabled, setIsEnabled] = useState(value);

    const toggleSwitch = () => {
      setIsEnabled((previousState) => !previousState);
    };

    useEffect(() => {
      onChangeValue && onChangeValue(isEnabled);
    }, [isEnabled]);

    return (
      <View style={[styles.container, style]}>
        {label && (
        <Text type="label" style={labelStyle}>
          {label}
        </Text>
        )}
        <SwitchOriginal {...switchProps} onValueChange={toggleSwitch} value={isEnabled} ref={ref} />
        <Text type="error">{error && error.message}</Text>
      </View>
    );
  },
);

Switch.displayName = 'Switch';

export default Switch;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
});
