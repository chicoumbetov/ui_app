/**
 * Création d'une celulle d'une ligne
 *
 * @author: Randy Larzabal, David-Julian Buch
 */
import * as React from 'react';
import {
  FieldError, FormState,
} from 'react-hook-form';
import { Switch, TextInput } from 'react-native';
import _ from 'lodash';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form/dist/types/form';
import { AvailableValidationRules, composeValidationRules } from './validation';
import { SelectHandles } from './Select';
import { AutoCompleteHandles } from './AutoComplete';
import { useUpdateEffect } from '../../utils/CustomHooks';

export interface ErrorMap {
  [key: string]: FieldError | undefined;
}
export type PossibleFields = TextInput | SelectHandles | Switch | AutoCompleteHandles;
export type ChangeValueCallbackType = (v?: string | boolean | number) => void;
interface Props<T> {
  children: React.ReactElement;
  register: UseFormRegister<T>;
  formState: FormState<T>;
  setValue: UseFormSetValue<T>;
  defaultValues?: Partial<T>;
}
export type ChildProp = {
  name: string;
  validators: AvailableValidationRules[];
  label: string;
};
export default function Form<T>({
  register,
  formState,
  setValue,
  children,
  defaultValues,
}: Props<T>): JSX.Element {
  const Inputs = React.useRef<PossibleFields[]>([]);
  const registerMyInput = (
    name: string,
    label: string,
    validators: AvailableValidationRules[],
    setInitialValue = false,
  ) => {
    if (name) {
      register(name, validators ? composeValidationRules(validators, label) : undefined);
      const initialValue = _.get(defaultValues, name);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      setInitialValue && setValue(name, initialValue);
    }
  };
  /**
   * Function registering all children in a recursive manner, allowing Form to have as many nested
   * components as required by the desired layout.
   *
   * All children having a name property are considered being inputs and so are registered by hook
   * form
   */
  const registerChildren = (innerChildren: React.ReactElement, setValues = false) => {
    (Array.isArray(innerChildren) ? [...innerChildren] : [innerChildren]).forEach(
      (child: React.ReactElement) => {
        if (child?.props?.name && child?.props?.name !== '') {
          registerMyInput(child.props.name, child.props.label ? child.props.label : child.props.placeholder, child.props.validators, setValues);
        } else if (child?.props?.children && Array.isArray(child?.props?.children)) {
          registerChildren(child.props.children, setValues);
        } else if (child?.props?.children?.props?.name && child?.props?.children?.props?.name !== ''
        ) {
          const myUniqueChild = child.props.children;
          registerMyInput(
            myUniqueChild.props.name,
            myUniqueChild.props.label,
            myUniqueChild.props.validators,
            setValues,
          );
        } else if (Array.isArray(child)) {
          registerChildren(child, setValues);
        }
      },
    );
  };
  useUpdateEffect(() => {
    registerChildren(children);
  }, [register]);
  React.useEffect(() => {
    // lors du premier render on met les valeurs, sinon elles manques
    registerChildren(children, true);
  }, []);
  let index = -1;
  /**
   * Function rendering all children in a recursive manner, allowing Form to have as many nested
   * components as required by the desired layout.
   *
   * All children having a name property are considered being inputs and so are registered by hook
   * form
   */
  const renderInput = (child: JSX.Element): React.ReactNode => {
    if (child?.props?.name && child?.props?.name !== '') {
      // eslint-disable-next-line no-plusplus
      index++;
      const i = index;
      return React.createElement(child.type, {
        ...{
          ...child.props,
          ref: (e: PossibleFields) => {
            Inputs.current[i] = e;
          },
          key: child.props.name,
          onChangeValue: (v?: string | number) => {
            setValue(child.props.name, v, {
              shouldValidate: true,
            });
            if (child.props.onChangeValue) {
              child.props.onChangeValue(v);
            }
          },
          onSubmitEditing: () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            Inputs.current[i + 1] ? Inputs.current[i + 1].focus() : Inputs.current[i].blur();
            if (child.props.onSubmitEditing) {
              child.props.onSubmitEditing();
            }
          },
          blurOnSubmit: false,
          error: _.get(formState.errors, child.props.name),
        },
      });
    }
    if (
      child?.props?.children
        && Array.isArray(child.props.children)
        && child.props.children.length > 0
    ) {
      return React.createElement(child.type, {
        ...{
          ...child.props,
          children: renderInputs(child.props.children),
        },
      });
    }
    if (child?.props?.children?.props?.name && child?.props?.children?.props?.name !== ''
    ) {
      const myUniqueChild = child.props.children;
      return renderInput(myUniqueChild);
    }
    if (Array.isArray(child)) {
      return React.createElement(child.type, {
        ...{
          ...child.props,
          children: renderInputs(child),
        },
      });
    }
    return child;
  };
  // eslint-disable-next-line max-len,@typescript-eslint/no-shadow
  const renderInputs = (children: React.ReactElement) => (Array.isArray(children) ? [...children] : [children])
    .map((child) => renderInput(child));
  return <>{renderInputs(children)}</>;
}
