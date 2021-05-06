// @ts-ignore
import { ValidationRules } from 'react-hook-form';
import { parsePhoneNumber } from 'libphonenumber-js';

export enum AvailableValidationRules {
  required = 'required',
  email = 'email',
  numeroTel = 'numeroTel',
  password = 'password',
}

export type ValidationRuleConfig = Array<
AvailableValidationRules |
{ rule: AvailableValidationRules, errorMessage: string }
>;

type ValidationRulesDefiniton = (name?: string, message?: string) => ValidationRules;

// eslint-disable-next-line max-len
export type ValidationRulesDefinitionMap = Record<AvailableValidationRules, ValidationRulesDefiniton>;

const availableValidationRulesDefinition: ValidationRulesDefinitionMap = {
  required: (name?: string, message?:string): ValidationRules => ({
    required: { value: true, message: message || `${name} est requis` },
  }),
  email: (name?: string, message?:string): ValidationRules => ({
    pattern: {
      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: message || `Le champ ${name} n'est pas valide`,
    },
  }),
  numeroTel: (name?: string, message?:string): ValidationRules => ({
    validate: (data: string | undefined) => {
      try {
        if (data !== undefined && !parsePhoneNumber(data).isValid()) {
          return message || `Le champ ${name} n'est pas valide`;
        }
      } catch (error) {
        return message || `Le champ ${name} n'est pas valide`;
      }
      return true;
    },
  }),
  password: (name?: string, message?:string): ValidationRules => ({
    validate: (data: string | undefined) => {
      if (data !== undefined && data.length < 6) {
        return message || `${name} doit avoir une longueur minimale de 6 caractères`;
      }
      return true;
    },
  }),
};

export default availableValidationRulesDefinition;

export const composeValidationRules = (
  rulesList: ValidationRuleConfig,
  name?: string,
): ValidationRules => {
  const validationRules: ValidationRules = {};

  rulesList.forEach((rule) => {
    let definition: ValidationRules = {};
    if (typeof rule === 'object') {
      definition = availableValidationRulesDefinition[rule.rule](name, rule.errorMessage);
    } else {
      definition = availableValidationRulesDefinition[rule](name);
    }
    Object.assign<ValidationRules, ValidationRules>(
      validationRules,
      definition,
    );
  });

  return validationRules;
};
