import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { useEffect, useState } from 'react';
import { Radio } from '@ui-kitten/components';
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

    return (
      <>
        <View style={[styles.container, style]}>
          {labelPosition === 'before' && (
            typeof label === 'string' ? (
              <FalsyText
                category="p1"
                style={[styles.labelBeforeMargin, labelStyle]}
                component={label}
              />
            ) : <FalsyFC component={label} />
          )}
          <Radio {...switchProps} onChange={toggleSwitch} checked={isEnabled} ref={ref} />

          {labelPosition === 'after' && (

            typeof label === 'string' ? (
              <FalsyText
                category="p1"
                style={[styles.labelBeforeMargin, labelStyle]}
                component={label}
              />
            ) : <FalsyFC component={label} />
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
