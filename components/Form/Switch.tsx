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
import {
  Toggle, ToggleProps,
} from '@ui-kitten/components';
import { FalsyText } from '@ui-kitten/components/devsupport';
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
        {labelPosition === 'before' && (
        <FalsyText
          category="label"
          style={labelStyle}
          component={label}
        />
        )}
        <Toggle {...switchProps} onChange={toggleSwitch} checked={isEnabled} ref={ref} />

        {labelPosition === 'after' && (
        <FalsyText
          category="label"
          style={labelStyle}
          component={label}
        />
        )}
        <FalsyText
          status={error && error.message ? 'danger' : ''}
          component={error && error.message}
        />
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
