import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { Toggle } from '@ui-kitten/components';
import { FalsyText } from '@ui-kitten/components/devsupport';
import { SwitchFormProps } from './types';

const Switch = React.forwardRef<Toggle, SwitchFormProps>(
  (props: SwitchFormProps, ref): React.ReactElement => {
    const {
      label, labelStyle, error, style, onChangeValue, defaultValue = false, labelPosition = 'before', ...switchProps
    } = props;

    const [isEnabled, setIsEnabled] = useState(defaultValue);

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
