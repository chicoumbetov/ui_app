import React from 'react';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';
import debounce from '../../utils/debounce';

const HeaderBack = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const goBack = React.useCallback(
    debounce(() => {
      console.log(navigation.isFocused(), navigation.canGoBack());
      if (navigation.isFocused()) {
        navigation.dispatch({
          ...StackActions.pop(),
          source: route.key,
        });
      }
    }, 50),
    [navigation, route.key],
  );

  return (
    <TouchableOpacity
      onPress={() => {
        goBack();
      }}
      style={{
        marginHorizontal: 20,
      }}
    >
      <Icon name="arrow-back-outline" fill="#b5b5b5" style={{ height: 40, width: 40 }} />
    </TouchableOpacity>
  );
};

export default HeaderBack;
