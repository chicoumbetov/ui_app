import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { useEffect, useState } from 'react';
import { Radio, Text } from '@ui-kitten/components';
import { FalsyFC, FalsyText } from '@ui-kitten/components/devsupport';
import { RadioFormProps } from './types';

const RadioComp = React.forwardRef<Radio, RadioFormProps>(
  (props: RadioFormProps, ref): React.ReactElement => {
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

    let finalLabel;
    if (typeof label === 'string') {
      finalLabel = (p: any) => (
        <Text style={{ flex: 1 }}>
          <Text {...p}>{label}</Text>
        </Text>
      );
    } else {
      finalLabel = label;
    }

    return (
      <>
        <View style={[styles.container, style]}>
          {labelPosition === 'before' && (
          <FalsyFC component={finalLabel} />
          )}
          <Radio {...switchProps} onChange={toggleSwitch} checked={isEnabled} ref={ref} />

          {labelPosition === 'after' && (

          <FalsyFC component={finalLabel} />
          )}
        </View>
        <FalsyText
          status={error && error.message ? 'danger' : ''}
          component={error && error.message}
        />
      </>
    );
  },
);

RadioComp.displayName = 'Radio';

export default RadioComp;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelBeforeMargin: {
    marginRight: 10,
  },
  labelAfterMargin: {
    marginLeft: 10,
  },
});
