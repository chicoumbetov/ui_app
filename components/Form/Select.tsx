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
import { AvailableValidationRules } from './validation';
import { Input } from '../UIKittenRewrite/Input';

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
      validators,
      placeholder,
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

    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    useEffect(() => {
      console.log('default : ', defaultValue);
      console.log('data : ', data);
      if (data && data.length > 0) {
        if (data[0].section !== undefined) {
          const selectedIndexValue = data.findIndex((item) => item.section === defaultValue);
          setSelectedIndex(selectedIndexValue);
        } else {
          const selectedIndexValue = data.findIndex((item) => item.key === defaultValue);
          setSelectedIndex(selectedIndexValue);
        }
      }
    }, [data, defaultValue]);

    if (data === undefined) {
      return (<></>);
    }

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
          placeholder={(placeholder || '') + ((validators && validators.indexOf(AvailableValidationRules.required) > -1) ? ' *' : '')}
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
    marginBottom: 20,
  },
  input: {
    height: 40,
  },
});
