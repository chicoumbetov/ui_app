/**
 * Renvoi une liste de filtre
 *
 * @author: Randy Larzabal
 */

import React, {
  RefObject, useEffect, useImperativeHandle, useRef, useState,
} from 'react';
import {
  StyleProp, StyleSheet, TextStyle, TouchableWithoutFeedback, View, ViewStyle,
} from 'react-native';
import Icon from '../Icon/Icon';

import Items, { SelectItem } from './Items';
import { Option } from './Option';
import { colors } from '../../assets/styles';

export type SelectProps<KT = string | number> = {
  data: SelectItem<KT>[];
  width?: number;
  height?: number;
  search?: boolean;
  placeholder?: string;
  onSelect?: (item?: SelectItem<KT>) => void;
  parentScrollEnable?: () => void;
  style?: StyleProp<ViewStyle>;
  styleOption?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  initKey?: SelectItem<KT>['key'];
  searchPlaceholder?: string;
};
export type SelectC<KT = string | number> = React.FC<SelectProps<KT> & PassedInRef>;

export type SelectHandles = {
  focus: () => void;
  blur: () => void;
};

type PassedInRef = {
  passedInRef?: RefObject<SelectHandles | undefined>;
};

export function Select<KT = string | number>(props: SelectProps<KT> & PassedInRef): JSX.Element {
  const viewRef = useRef<View>(null);
  const [value, setValue] = useState<string>();
  const [showOption, setShowOption] = useState(false);
  const [location, setLocation] = useState({
    fx: 0, fy: 0, px: 0, py: 0, width: 0, height: 0,
  });
  const [borderColor, setBorderColor] = useState(colors.text);
  const [borderRadiusStyle, setBorderRadiusStyle] = useState<ViewStyle>({ borderRadius: 10 });
  const [searchText, setSearchText] = useState('');

  const {
    placeholder = 'Choisir',
    onSelect,
    parentScrollEnable,
    width,
    height,
    data,
    style,
    styleOption,
    styleText,
    initKey,
    passedInRef,
    searchPlaceholder = 'Rechercher',
    search,
  } = props;

  useEffect(() => {
    setValue(initKey ? data.filter((item) => item?.key === initKey)[0]?.label : undefined);
    initKey && onSelect && onSelect(data.filter((item) => item?.key === initKey)[0]);
  }, [initKey]);

  useEffect(() => {
    if (showOption) {
      setBorderRadiusStyle({
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      });
    } else {
      setBorderRadiusStyle({ borderRadius: 10 });
    }
  }, [showOption]);

  if (passedInRef) {
    useImperativeHandle(passedInRef, () => ({
      focus: onPress,
      blur: handleOptionsClose,
    }));
  }

  const dimensions = { width, height };
  const finalStyle = StyleSheet.flatten<ViewStyle>([
    styles.container,
    dimensions,
    style,
    { flexDirection: 'row', justifyContent: 'space-between', borderColor },
    borderRadiusStyle,
  ]);
  const borderTopWidth = finalStyle.borderTopWidth ? finalStyle.borderTopWidth : finalStyle.borderWidth;

  // fonction de reinitialisation du composant
  const reset = () => {
    setValue(undefined);
    setSearchText('');
    setShowOption(false);
    onSelect && onSelect();
    if (parentScrollEnable) {
      parentScrollEnable();
    }
  };

  const onPress = () => {
    if (showOption) {
      setShowOption(false);
      setBorderColor(colors.text);
    } else {
      setBorderColor(colors.green);
      viewRef.current?.measure((_width, _height, px, py, fx, fy) => {
        const newLocation = {
          fx,
          fy: fy + py - (borderTopWidth ?? 0),
          width: px,
          height: py,
        };
        setLocation({ ...location, ...newLocation });
        setShowOption(true);
      });
      if (parentScrollEnable) {
        parentScrollEnable();
      }
    }
  };

  // fonction onClick sur l'item
  const handleSelect = (item: SelectItem<KT>) => {
    setShowOption(false);
    setValue(item?.label);
    onSelect && onSelect(item);
    if (parentScrollEnable) {
      parentScrollEnable();
    }
  };

  // fonction pour fermer la liste déroulante
  const handleOptionsClose = () => {
    setShowOption(false);
    setBorderColor(colors.text);
    if (parentScrollEnable) {
      parentScrollEnable();
    }
  };

  return (
    <View>
      <View
        onLayout={() => {
          viewRef.current?.measure((_width, _height, px, py, fx, fy) => {
            const newLocation = {
              fx,
              fy: fy + py - (borderTopWidth ?? 0),
              width: px,
              height: py,
            };
            setLocation({ ...location, ...newLocation });
          });
        }}
        ref={viewRef}
        style={finalStyle}
      >
        {!showOption && (
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            style={{
              flex: 3,
            }}
          >
            <Option style={styleOption} styleText={[styleText, { color: colors.darkGray }]}>
              {value ?? placeholder}
            </Option>
          </View>
        </TouchableWithoutFeedback>
        )}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            {value && (
            <TouchableWithoutFeedback onPress={reset}>
              <View style={{ flex: 1 }}>
                <Icon name="close" size={12} style={{ marginRight: 5 }} />
              </View>
            </TouchableWithoutFeedback>
            )}
            <TouchableWithoutFeedback onPress={onPress}>
              <View style={{ flex: 1 }}>
                <Icon name="chevron" size={12} style={{ marginRight: 5 }} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <Items<KT>
        {...props}
        items={data}
        show={showOption}
        width={location.width}
        height={location.height}
        location={location}
        onPress={handleSelect}
        handleClose={handleOptionsClose}
        placeholder={searchPlaceholder}
        search={search}
        searchText={searchText}
        setSearchText={(text) => setSearchText(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
});
