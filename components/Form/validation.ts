// @ts-ignore
import { ValidationRules } from 'react-hook-form';
import { parsePhoneNumber } from 'libphonenumber-js';

export enum AvailableValidationRules {
  required = 'required',
  email = 'email',
  numeroTel = 'numeroTel',
  password = 'password',
}

type ValidationRulesDefiniton = (name?: string) => ValidationRules;

// eslint-disable-next-line max-len
export type ValidationRulesDefinitionMap = Record<AvailableValidationRules, ValidationRulesDefiniton>;

const availableValidationRulesDefinition: ValidationRulesDefinitionMap = {
  required: (name?: string): ValidationRules => ({
    required: { value: true, message: `${name} est requis` },
  }),
  email: (name?: string): ValidationRules => ({
    pattern: {
      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: `Le champ ${name} n'est pas valide`,
    },
  }),
  numeroTel: (name?: string): ValidationRules => ({
    validate: (data: string | undefined) => {
      try {
        if (data !== undefined && !parsePhoneNumber(data).isValid()) {
          return `Le champ ${name} n'est pas valide`;
        }
      } catch (error) {
        return `Le champ ${name} n'est pas valide`;
      }
      return true;
    },
  }),
  password: (name?: string): ValidationRules => ({
    validate: (data: string | undefined) => {
      try {
        if (data !== undefined && !parsePhoneNumber(data).isValid()) {
          return `Le champ ${name} n'est pas valide`;
        }
      } catch (error) {
        return `Le champ ${name} n'est pas valide`;
      }
      return true;
    },
  }),
};

export default availableValidationRulesDefinition;

export const composeValidationRules = (
  rulesList: Array<AvailableValidationRules>,
  name?: string,
): ValidationRules => {
  const validationRules: ValidationRules = {};

  rulesList.forEach((rule) => {
    Object.assign<ValidationRules, ValidationRules>(
      validationRules,
      availableValidationRulesDefinition[rule](name),
    );
  });

  return validationRules;
};
