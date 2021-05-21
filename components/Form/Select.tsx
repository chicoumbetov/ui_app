import * as React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import {
  useState, useRef, useImperativeHandle, useEffect,
} from 'react';
import {
  Select, SelectItem, IndexPath,
} from '@ui-kitten/components';
import { AutoCompleteHandles } from '../AutoComplete/AutoComplete';
import { SelectFormProps, SelectHandles } from './types';

const SelectComp = React.forwardRef<SelectHandles, SelectFormProps<string | number>>(
  (props: SelectFormProps<string | number>, ref): React.ReactElement => {
    const {
      defaultValue,
      labelStyle,
      error,
      style,
      onChangeValue,
      containerStyle,
      data,
      status,
      ...selectProps
    } = props;

    const selectRef = useRef<AutoCompleteHandles>({
      focus: () => {

      },
      blur: () => {

      },
    });

    useImperativeHandle(ref, () => ({
      focus: selectRef.current.focus,
      blur: selectRef.current.blur,
    }));

    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    useEffect(() => {
      const selectedIndexValue = data.findIndex((item) => item.key === defaultValue);
      setSelectedIndex(selectedIndexValue);
    }, [defaultValue]);

    return (
      <View style={[styles.container, containerStyle]}>
        <Select
          value={selectedIndex > -1 ? data[selectedIndex].label : undefined}
          selectedIndex={selectedIndex > -1 ? new IndexPath(selectedIndex) : undefined}
          onSelect={(index) => {
            const selectedI = Array.isArray(index) ? index[0].row : index.row;
            setSelectedIndex(selectedI);
            if (onChangeValue) {
              if (data[selectedI].section !== undefined) {
                onChangeValue(data[selectedI].section);
              } else {
                onChangeValue(data[selectedI].key);
              }
            }
          }}
          {...selectProps}
          caption={error && error.message}
          status={error && error.message !== '' ? 'danger' : status}
        >
          {data.map((item) => (
            <SelectItem
              title={item.label}
              key={item.key}
            />
          ))}
        </Select>
      </View>
    );
  },
);

SelectComp.displayName = 'SelectComp';

export default SelectComp;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    flex: 1,
  },
  input: {
    height: 40,
  },
});
