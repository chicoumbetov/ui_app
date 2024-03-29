/**
 * Création d'une celulle d'une ligne
 *
 * @author: Randy Larzabal, David-Julian Buch
 */
import * as React from 'react';
import {
  FormState, UseFormGetValues, UseFormUnregister,
} from 'react-hook-form';
import _ from 'lodash';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form/dist/types/form';
import isDeepEqual from 'fast-deep-equal/react';
import { composeValidationRules, ValidationRuleConfig } from './validation';
import { useUpdateEffect } from '../../utils/CustomHooks';
import { PossibleFields } from './types';
import { Nullable } from '../../utils/typeHelpers';
import { getPaths } from '../../utils/ObjectHelper';

interface Props<T> {
  children: React.ReactElement;
  register: UseFormRegister<T>;
  unregister: UseFormUnregister<T>;
  formState: FormState<T>;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  defaultValues?: Nullable<T> | null;
}

export default function Form<T>({
  register,
  unregister,
  formState,
  setValue,
  getValues,
  children,
  defaultValues,
}: Props<T>): JSX.Element {
  const Inputs = React.useRef<PossibleFields[]>([]);
  const defaultValuesRef = React.useRef(defaultValues);
  const listRegisteredNamesForCurrentChildren: string[] = [];

  if (!isDeepEqual(defaultValuesRef.current, defaultValues)) {
    defaultValuesRef.current = defaultValues;
  }

  const registerMyInput = (
    name: string,
    label: string,
    validators: ValidationRuleConfig,
    setInitialValue = false,
  ) => {
    if (name) {
      register(name, validators ? composeValidationRules(validators, getValues, label) : undefined);
      listRegisteredNamesForCurrentChildren.push(name);
      if (setInitialValue) {
        const initialValue = _.get(defaultValues, name);
        const currentValue = getValues(name);
        if (initialValue && !currentValue) {
          setValue(name, initialValue);
        }
      }
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
          registerMyInput(child.props.name, child.props.label
            ? child.props.label
            : child.props.placeholder, child.props.validators, setValues);
        } else if (child?.props?.children && Array.isArray(child?.props?.children)) {
          registerChildren(child.props.children, setValues);
        } else if (child?.props?.children?.props?.name && child?.props?.children?.props?.name !== ''
        ) {
          const myUniqueChild = child.props.children;
          registerMyInput(
            myUniqueChild.props.name,
            myUniqueChild.props.label ? myUniqueChild.props.label : myUniqueChild.props.placeholder,
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

  const getChildrenNames = (innerChildren: React.ReactElement): string[] => {
    const array = (Array.isArray(innerChildren) ? [...innerChildren] : [innerChildren]).reduce(
      (arr: string[], child: React.ReactElement) => {
        if (child?.props?.name && child?.props?.name !== '') {
          arr.push(child?.props?.name);
          return arr;
        } if (child?.props?.children && Array.isArray(child?.props?.children)) {
          return arr.concat(getChildrenNames(child?.props?.children));
        } if (child?.props?.children?.props?.name && child?.props?.children?.props?.name !== ''
        ) {
          arr.push(child?.props?.children?.props?.name);
          return arr;
        } if (Array.isArray(child)) {
          return arr.concat(getChildrenNames(child));
        }
        return arr;
      },
      [],
    );
    return array;
  };

  const currentChildrenNames = getChildrenNames(children);
  React.useEffect(() => {
    // lors du premier render on met les valeurs, sinon elles manquent
    registerChildren(children, true);
    // on verifie si on a pas des vieux champs qu'il faudrait supprimer
    const currentFields = getPaths(getValues());
    const anciens = currentFields.filter((x) => !listRegisteredNamesForCurrentChildren.includes(x));
    unregister(anciens);
  }, [defaultValuesRef.current, JSON.stringify(currentChildrenNames)]);
  let index = -1;
  let keys = 1;

  /**
   * Function rendering all children in a recursive manner, allowing Form to have as many nested
   * components as required by the desired layout.
   *
   * All children having a name property are considered being inputs and so are registered by hook
   * form
   */
  const renderInput = (child: JSX.Element): React.ReactNode => {
    keys += 1;
    if (child?.props?.name && child?.props?.name !== '') {
      index += 1;
      const i = index;
      return React.createElement(child.type, {
        ...{
          ...child.props,
          ref: (e: PossibleFields) => {
            Inputs.current[i] = e;
          },
          key: child.props.name,
          defaultValue: _.get(defaultValues, child.props.name),
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
            Inputs.current[i + 1] && Inputs.current[i + 1].focus
              ? Inputs.current[i + 1].focus()
              : (Inputs.current[i].blur && Inputs.current[i].blur());
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
          key: keys,
          children: renderInputs(child.props.children),
        },
      });
    }
    if (child?.props?.children?.props?.name && child?.props?.children?.props?.name !== ''
    ) {
      const myUniqueChild = child.props.children;
      return React.createElement(child.type, {
        ...{
          ...child.props,
          key: keys,
          children: renderInput(myUniqueChild),
        },
      });
    }
    if (Array.isArray(child)) {
      return React.createElement(child.type, {
        ...{
          ...child.props,
          key: keys,
          children: renderInputs(child),
        },
      });
    }
    // @ts-ignore
    if (child) {
      return React.createElement(child.type, {
        ...{
          ...child.props,
          key: keys,
        },
      });
    }
  };
  // eslint-disable-next-line max-len,@typescript-eslint/no-shadow
  const renderInputs = (children: React.ReactElement) => (Array.isArray(children) ? [...children] : [children])
    .map((child) => renderInput(child));

  return <React.Fragment key="root-form">{renderInputs(children)}</React.Fragment>;
}
