import * as React from 'react';
import {
  View,
  StyleSheet,
  TextStyle,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { FieldError } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Toggle, ToggleProps, Text } from '@ui-kitten/components';
import { ChangeValueCallbackType } from './Form';

export type SwitchFormProps = {
  name: string;
  label?: string;
  labelPosition?: 'before' | 'after';
  labelStyle?: StyleProp<TextStyle>;
  error?: FieldError | undefined;
  style?: StyleProp<ViewStyle>;
  value?: boolean;
  onChangeValue?: ChangeValueCallbackType;
} & ToggleProps;

const Switch = React.forwardRef<Toggle, SwitchFormProps>(
  (props: SwitchFormProps, ref): React.ReactElement => {
    const {
      label, labelStyle, error, style, onChangeValue, value = false, labelPosition = 'before', ...switchProps
    } = props;

    const [isEnabled, setIsEnabled] = useState(value);

    const toggleSwitch = () => {
      setIsEnabled((previousState) => !previousState);
    };

    useEffect(() => {
      if (onChangeValue) {
        onChangeValue(isEnabled);
      }
    }, [isEnabled]);

    return (
      <View style={[styles.container, style]}>
        {label && labelPosition === 'before' && (
        <Text category="label" style={labelStyle}>
          {label}
        </Text>
        )}
        <Toggle {...switchProps} onChange={toggleSwitch} checked={isEnabled} ref={ref} />

        {label && labelPosition === 'after' && (
          <Text category="label" style={labelStyle}>
            {label}
          </Text>
        )}
        <Text category="error">{error && error.message}</Text>
      </View>
    );
  },
);

Switch.displayName = 'Switch';

export default Switch;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    flexDirection: 'row',
  },
});
