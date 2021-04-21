/**
 * Renvoi un input, avec une liste déroulante qui varie en fonction de la valeur de l'input
 *
 * @author: Randy Larzabal
 */
import React, {
  useState, useImperativeHandle, RefObject, useRef, useEffect,
} from 'react';
import {
  FlatList,
  TextInput,
  Text,
  View,
  ViewStyle,
  TouchableWithoutFeedback,
  StyleSheet,
  StyleProp,
  Platform,
} from 'react-native';

import {
  colors, fontSize, size, spacing,
} from '../../assets/styles';
import Icon from '../Icon';

export type SimplePredicate<P, F, V> = {
  predicateOperator: P;
  field: F;
  defaultValue?: V;
};

export type AutoCompleteProps<T> = {
  data: any[];
  maxItems?: number;
  itemTitleCallback: (item: T) => string;
  onSelect?: (allItems: T[], selectedItem?: T) => void;
  inputStyle?: StyleProp<ViewStyle>;
  defaultValue?: T[];
  initId?: string;
  multiple?: boolean;
  placeholder?: string;
  valueSearchPicker: (value: string) => void;
  itemsPickPicker: (values: T[]) => void;
};

export type AutoCompleteHandles = {
  focus: () => void;
  blur: () => void;
};

type PassedInRef = {
  passedInRef?: RefObject<AutoCompleteHandles | undefined>;
};

export function AutoComplete<T>(props: AutoCompleteProps<T> & PassedInRef): JSX.Element {
  const {
    data,
    onSelect,
    inputStyle,
    itemTitleCallback,
    passedInRef,
    placeholder,
    multiple = false,
    valueSearchPicker,
    itemsPickPicker,
  } = props;

  const viewRef = useRef<View>(null);
  const inputRef = useRef<TextInput>(null);
  const [location, setLocation] = useState({
    fx: 0, fy: 0, px: 0, py: 0, width: 0, height: 0,
  });
  const [show, setShow] = useState(false);
  const [itemsPick, setItemsPick] = useState<T[]>([]);

  const [borderRadiusStyle, setBorderRadiusStyle] = useState<ViewStyle>({
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  });

  const [inputColor, setInputColor] = useState<string>(colors.text);

  const [valueSearch, setValueSeach] = useState<string>('');

  if (passedInRef) {
    useImperativeHandle(passedInRef, () => ({
      focus: () => setShow(true),
      blur: () => setShow(false),
    }));
  }

  useEffect(() => {
    valueSearchPicker(valueSearch);
    itemsPickPicker(itemsPick);
  }, [valueSearch, itemsPick]);

  // item de la FlatList
  const Item = ({
    item,
    onPress,
    style,
    idx,
  }: {
    item: T;
    onPress: () => void;
    style: ViewStyle;
    idx: string | number;
  }) => (
    <TouchableWithoutFeedback onPress={onPress} key={idx} style={style}>
      <View style={{ padding: 5 }}>
        <Text style={{ marginLeft: 20, color: colors.darkGray }}>{itemTitleCallback(item)}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  // Renvoi une Flatlist, avec action sur les items
  const renderResultList = () => (
    <FlatList<T>
      keyboardShouldPersistTaps="always"
      onStartShouldSetResponderCapture={() => false}
      style={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: inputColor,
        flexGrow: 0,
      }}
      data={data}
      renderItem={({ item, index }) => (
        <Item
          item={item}
          idx={index}
          onPress={() => {
            if (multiple) {
              const allItems = [...itemsPick, item];
              setItemsPick(allItems);
              onSelect && onSelect(allItems, item);
            } else {
              const allItems = [item];
              setItemsPick(allItems);
              onSelect && onSelect(allItems, item);
              setShow(false);
              setInputColor(colors.text);
              setValueSeach('');
              inputRef?.current?.blur();
              setBorderRadiusStyle({
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              });
            }
          }}
          style={{ borderTopWidth: 1, padding: 4, borderColor: inputColor }}
        />
      )}
    />
  );

  // Renvoi un champ avec l'affiche des items sélectionné et l'input
  const renderTextInput = () => (
    <View style={[borderRadiusStyle, styles.input, { borderColor: inputColor }, inputStyle]}>
      {itemsPick.map((value, index) => (
        <View
          style={{
            borderWidth: multiple ? 1 : 0,
            padding: 2,
            marginRight: 10,
            marginVertical: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          key={index}
        >
          <Text>{itemTitleCallback(value)}</Text>
          {multiple && (
            <TouchableWithoutFeedback
              onPress={() => {
                const index = itemsPick.indexOf(value);
                const tab = itemsPick;
                if (index > -1) {
                  tab.splice(index, 1);
                  setItemsPick([...tab]);
                  onSelect && onSelect(tab);
                }
              }}
            >
              <View style={{ flex: 1 }}>
                <Icon name="close" size={10} style={{ marginLeft: 5 }} />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      ))}
      <TextInput
        ref={inputRef}
        onFocus={() => {
          setShow(true);
          setInputColor(colors.green);
          setBorderRadiusStyle({
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          });
        }}
        placeholder={placeholder}
        style={{
          flex: 1,
          paddingHorizontal: Platform.OS != 'web' ? spacing.xLarge : 20,
          fontSize: Platform.OS != 'web' ? fontSize.medium : fontSize.small,
        }}
        onChangeText={setValueSeach}
        value={valueSearch}
      />
      {(show || (!multiple && itemsPick.length > 0)) && (
        <TouchableWithoutFeedback
          onPress={() => {
            setBorderRadiusStyle({
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            });
            setShow(false);
            setInputColor(colors.text);
            setValueSeach('');
            setItemsPick([]);
            onSelect && onSelect([], undefined);
          }}
        >
          <View style={{ justifyContent: 'center' }}>
            <Icon
              name="close"
              size={24}
              style={{ marginRight: spacing.xLarge, marginVertical: 'auto' }}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );

  return (
    <View
      onLayout={() => {
        viewRef.current?.measure((_width, _height, px, py, fx, fy) => {
          const newLocation = {
            fx,
            fy: fy + py - 1,
            width: px,
            height: py,
          };
          setLocation({ ...location, ...newLocation });
        });
      }}
      ref={viewRef}
    >
      <View>{renderTextInput()}</View>
      {data.length > 0 && show && renderResultList()}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    fontSize: fontSize.input,
    height: 40,
    color: colors.text,
    borderRadius: size.borderRadius,
    flexDirection: 'row',
    padding: 5,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    opacity: 0.9,
    zIndex: 1000,
  },
});
