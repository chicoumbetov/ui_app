/**
 *
 *
 * @author: David-Julian Buch
 */
import React from 'react';
import { Spinner, SpinnerProps } from '@ui-kitten/components';
import { View } from 'react-native';

type ActivityIndicatorProps = SpinnerProps & {
  center?: boolean;
  margin?: number;
};

const ActivityIndicator = (props: ActivityIndicatorProps) => {
  const { center, margin, ...otherProps } = props;
  if (center) {
    return (
      <View style={{ margin, flex: 1, alignItems: 'center' }}>
        <Spinner {...otherProps} />
      </View>
    );
  }
  return (<Spinner {...otherProps} />);
};

export default ActivityIndicator;
