/**
 * Renvoi une Liste déroulante d'items
 *
 * @author: Randy Larzabal
 */

import React from 'react';
import {
  StyleSheet, View, TouchableWithoutFeedback, TextInput, Text, Modal, ScrollView,
} from 'react-native';

import { Overlay } from './Overlay';
import { SelectProps } from './Select';
import { colors } from '../../assets/styles';
import Icon, { IconName } from '../Icon';

export type SelectItem<KT = string | number> = {
  key: KT;
  label: string;
  section?: boolean;
  icon?: IconName;
  // to be as configurable as possible allow any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPress?: (row?: any) => void;
};

export type ItemsProps<KT> = {
  items: SelectItem<KT>[];
  onPress?: (item: SelectItem<KT>) => void;
  handleClose?: () => void;
  location?: { fx: number; fy: number };
  show: boolean;
  search?: boolean;
  searchText: string;
  setSearchText: (text: string) => void;
} & Pick<SelectProps<KT>, 'height' | 'width' | 'placeholder'>;

export default function Items<KT>(props: ItemsProps<KT>): JSX.Element {
  const {
    items,
    onPress,
    width,
    height,
    location,
    show,
    handleClose,
    placeholder,
    search = false,
    searchText,
    setSearchText,
  } = props;

  let x = 0;
  let y = 0;
  if (location) {
    x = location.fx;
    y = location.fy;
  }

  // Renvoi un tableau d'items filtrer avec la search bar
  const filteredItems = items.filter((item) => {
    if (item) {
      const parts = searchText.trim().split(/[ \-:]+/);
      const regex = new RegExp(`(${parts.join('|')})`, 'ig');
      return regex.test(item.label);
    }
    return false;
  });

  // Renvoi une liste d'items ou de une section
  // @ts-ignore
  const renderedItems = filteredItems.map((item, idx) => {
    if (item) {
      return item.section ? (
      // eslint-disable-next-line react/no-array-index-key
        <View style={{ padding: 5 }} key={idx}>
          <Text style={{ fontWeight: 'bold' }}>{item.label}</Text>
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={() => onPress && onPress(item)} key={idx}>
          <View style={{ padding: 5 }}>
            <Text style={{ marginLeft: 20, color: colors.darkGray }}>{item.label}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  });

  return (
    <Modal
      animationType="none"
      transparent
      visible={show}
      onRequestClose={handleClose}
      style={{ margin: 0 }}
    >
      <Overlay onPress={handleClose} />
      <View style={StyleSheet.flatten([styles.container, { left: x, top: y, width }])}>
        {search && (
        <View
          style={{
            height,
            borderBottomColor: filteredItems.length > 0 ? colors.green : colors.transparent,
            borderBottomWidth: 2,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Icon
              name="search"
              color={colors.black}
              size={12}
              style={{
                marginLeft: 5,
                flex: 1,
              }}
            />
            <TextInput
              onChangeText={(text) => setSearchText(text)}
              placeholder={placeholder}
              value={searchText}
              underlineColorAndroid="transparent"
              style={{ flex: 5, margin: 0, padding: 0 }}
            />
          </View>
        </View>
        )}
        <ScrollView
          style={{ width: (width ?? 0) - 2, maxHeight: (height ?? 0) * 3 }}
          automaticallyAdjustContentInsets={false}
          bounces={false}
        >
          {renderedItems}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    borderColor: colors.green,
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white',
    opacity: 0.9,
    zIndex: 1000,
  },
});
