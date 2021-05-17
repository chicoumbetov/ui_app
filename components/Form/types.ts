import { FieldError } from 'react-hook-form';
import {
  StyleProp, Switch, TextInput, TextInputProps, TextStyle, ViewStyle,
} from 'react-native';
import {
  InputProps, RadioProps, SelectProps, ToggleProps, DatepickerProps,
} from '@ui-kitten/components';
import { PersistentModel } from '@aws-amplify/datastore';
import { AutoCompleteHandles, AutoCompleteProps } from '../AutoComplete/AutoComplete';
import { ValidationRuleConfig } from './validation';
import { IconName } from '../Icon';

// Form Types
export interface ErrorMap {
  [key: string]: FieldError | undefined;
}
export type PossibleFields = TextInput | SelectHandles | Switch | AutoCompleteHandles | DatepickerProps;
export type ChangeValueCallbackType = (v?: string | boolean | number) => void;
export type FormChildProp = {
  name: string;
  validators?: ValidationRuleConfig;
  label?: string;
  placeholder?: string;
  onChangeValue?: ChangeValueCallbackType;
  error?: FieldError | undefined;
};

// Select Types
export type SelectFormProps<KT> = {
  label?: string;
  size?: string
  value?: KT;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  data: SelectItemProps<KT>[];
} & Exclude<SelectProps, 'children'> & FormChildProp;

export type SelectItemProps<KT = string | number> = {
  key: KT;
  label: string;
  section?: boolean;
  icon?: IconName;
  // to be as configurable as possible allow any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPress?: (row?: any) => void;
};

export type SelectHandles = {
  focus: () => void;
  blur: () => void;
};

// TextInput Types
export type TextInputFormProps = Exclude<InputProps, 'onChangeText'> & {
  icon?: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  withEyeToggle?: boolean;
} & FormChildProp;

// Switch Types
export type SwitchFormProps = {
  labelPosition?: 'before' | 'after';
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  value?: boolean;
} & ToggleProps & FormChildProp;

// AutoComplete Types
export type AutoCompleteFormProps<T extends PersistentModel> = {
  name: string;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  error?: FieldError | undefined;
  style?: StyleProp<ViewStyle>;
  validators?: ValidationRuleConfig;
  onChangeValue?: ChangeValueCallbackType;
  itemsFormator: (allItems: T[], selectedItem?: T) => string | number;
} & AutoCompleteProps<T>;

// Radio Types
export type RadioFormProps = {
  labelPosition?: 'before' | 'after';
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  label?: string | ((props:any) => JSX.Element);
  value?: boolean;
} & RadioProps & Omit<FormChildProp, 'label'>;

// PhoneNumberInput
export type PhoneNumberInputFormProps = Exclude<TextInputProps, 'onChangeText'> & {
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
} & FormChildProp;

export type DatePickerFormProps = Exclude<DatepickerProps, 'onChangeText'> & {
  icon?: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  defaultValue?: Date;
  labelBefore?: boolean;
} & FormChildProp;
