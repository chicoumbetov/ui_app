// @ts-ignore
import { UseFormGetValues, ValidationRules } from 'react-hook-form';
import { parsePhoneNumber } from 'libphonenumber-js';
import _ from 'lodash';

export enum AvailableValidationRules {
  required = 'required',
  requiredIfNotEmpty = 'requiredIfNotEmpty',
  email = 'email',
  numeroTel = 'numeroTel',
  password = 'password',
  float = 'float',
  negative = 'negative',
  purchaseYear = 'purchaseYear',
  purchasePrice = 'purchasePrice',
  notaryFee = 'notaryFee',
}

export type ValidationRuleConfig = Array<
AvailableValidationRules |
{ rule: AvailableValidationRules, errorMessage: string, ifNotEmpty?: string[] }
>;

type ValidationRulesDefiniton = (
  name?: string,
  message?: string,
  ifNotEmpty?: string[],
  getValues?: UseFormGetValues<any>
) => ValidationRules;

// eslint-disable-next-line max-len
export type ValidationRulesDefinitionMap = Record<AvailableValidationRules, ValidationRulesDefiniton>;

const availableValidationRulesDefinition: ValidationRulesDefinitionMap = {
  required: (name?: string, message?:string): ValidationRules => ({
    required: { value: true, message: message || `${name} est requis` },
  }),
  requiredIfNotEmpty: (
    name?: string,
    message?:string,
    ifNotEmpty?: string[],
    getValues?: UseFormGetValues<any>,
  ): ValidationRules => ({
    validate: {
      requiredIfNotEmpty: (data: string | undefined) => {
        const fieldsNotEmpty = ifNotEmpty?.map((v) => {
          if (getValues) {
            const otherValue = getValues(v);
            if (otherValue && otherValue.trim() !== '') {
              return true;
            }
          }
          return false;
        }).filter((v) => v);
        if ((fieldsNotEmpty?.length || 0) > 0 && (!data || data.trim() === '')) {
          return message || `${name} est requis`;
        }
        return true;
      },
    },
  }),
  email: (name?: string, message?:string): ValidationRules => ({
    pattern: {
      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: message || `Le champ ${name} n'est pas valide`,
    },
  }),
  numeroTel: (name?: string, message?:string): ValidationRules => ({
    validate: {
      numeroTel: (data: string | undefined) => {
        try {
          if (data !== undefined && !parsePhoneNumber(data).isValid()) {
            return message || `Le champ ${name} n'est pas valide`;
          }
        } catch (error) {
          return message || `Le champ ${name} n'est pas valide`;
        }
        return true;
      },
    },
  }),
  password: (name?: string, message?:string): ValidationRules => ({
    validate: {
      password: (data: string | undefined) => {
        if (data !== undefined && data.trim() !== '' && data.length < 6) {
          return message || `${name} doit avoir une longueur minimale de 6 caractères`;
        }
        return true;
      },
    },
  }),
  float: (name?: string, message?:string): ValidationRules => ({
    validate: {
      float: (data: string | undefined) => {
        if (Number.isNaN(Number(data))) {
          return message || `${name} ne doit pas contenir de lettres`;
        }
        return true;
      },
    },
  }),
  negative: (name?: string, message?:string): ValidationRules => ({
    validate: {
      negative: (data: string | undefined) => {
        if (Number(data) > 0) {
          return message || `${name} doit être nul ou inférieur a 0`;
        }
        return true;
      },
    },
  }),
  purchasePrice: (): ValidationRules => ({
    validate: {
      purchasePrice: () => "Le prix d'acquisition est requis",
    },
  }
  ),
  purchaseYear: (): ValidationRules => ({
    validate: {
      purchaseYear: () => "L'année d'acquisition est requise",
    },
  }
  ),
  notaryFee: (): ValidationRules => ({
    validate: {
      notaryFee: () => 'Frais de notaire est requis',
    },
  }
  ),
};

export default availableValidationRulesDefinition;

export const composeValidationRules = (
  rulesList: ValidationRuleConfig,
  getValues: UseFormGetValues<any>,
  name?: string,
): ValidationRules => {
  const validationRules: ValidationRules = {};

  rulesList.forEach((rule) => {
    let definition: ValidationRules = {};
    if (typeof rule === 'object') {
      definition = availableValidationRulesDefinition[rule.rule](
        name,
        rule.errorMessage,
        rule.ifNotEmpty,
        getValues,
      );
    } else {
      definition = availableValidationRulesDefinition[rule](name);
    }
    _.merge<ValidationRules, ValidationRules>(
      validationRules,
      definition,
    );
  });

  return validationRules;
};
