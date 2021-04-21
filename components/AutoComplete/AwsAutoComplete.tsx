/**
 * Renvoi le composant AutoComplete alimenté avec des valeur fetch depuis l'Api DataStore
 *
 * @author: Randy Larzabal
 */

import React, { useEffect, useState, RefObject } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { DataStore, PersistentModelConstructor } from '@aws-amplify/datastore';
import { PersistentModel, ModelPredicate, PredicateExpression } from '@aws-amplify/datastore/lib-esm/types';

import { AutoComplete } from './AutoComplete';

export type SimplePredicate<P, F, V> = {
  predicateOperator: P;
  field: F;
  defaultValue?: V;
};

export type TypeFieldPredicate<T extends PersistentModel, K> = K extends keyof T
  ? SimplePredicate<Parameters<PredicateExpression<T, T[K]>>[0], K, T[K]>
  : never;

export type AutoCompleteC<T extends PersistentModel> = React.FC<AutoCompleteProps<T> & PassedInRef>;

export type Condition<T extends PersistentModel, PK> = {
  [K in keyof T]?: T[K] extends PK ? TypeFieldPredicate<T, K> : undefined;
}[keyof T];

export type AutoCompleteProps<T extends PersistentModel> = {
  query: PersistentModelConstructor<T>;
  maxItems?: number;
  itemTitleCallback: (item: T) => string;
  onSelect?: (allItems: T[], selectedItem?: T) => void;
  inputStyle?: StyleProp<ViewStyle>;
  conditions: T extends PersistentModel
    ? Condition<T, string>[]
    : SimplePredicate<string, string, string>[];
  defaultValue?: T[];
  initId?: string;
  multiple?: boolean;
  placeholder?: string;
};

export type AutoCompleteHandles = {
  focus: () => void;
  blur: () => void;
};

type PassedInRef = {
  passedInRef?: RefObject<AutoCompleteHandles | undefined>;
};

export function AwsAutoComplete<T extends PersistentModel>(
  props: AutoCompleteProps<T> & PassedInRef,
): JSX.Element {
  const {
    query, maxItems = 5, onSelect, conditions, defaultValue, initId,
  } = props;
  const [datas, setDatas] = useState<T[]>([]);
  const [itemsPick, setItemsPick] = useState<T[]>([]);
  const [valueSearch, setValueSearch] = useState<string>('');

  useEffect(() => {
    (async () => {
      if (initId) {
        const listData = await DataStore.query(
          query,
          (condition) => condition.id('eq', initId as any),
          {
            limit: 1,
          },
        );
        setItemsPick(listData);
      }
    })();
  }, [initId]);

  useEffect(() => {
    if (defaultValue) {
      const allItems = [...defaultValue];
      setItemsPick(allItems);
      onSelect && onSelect(allItems);
    }
  }, []);

  useEffect(() => {
    getListOfQuery();
  }, [itemsPick, valueSearch]);

  // Fetch les données sur DataStore en excluant l'item ou les items selectionné(s)
  const getListOfQuery = async () => {
    if (query) {
      const listData = await DataStore.query(
        query,
        (condition) => excludePicked(
          conditions ? condition.or((condition) => getPredicates(condition)) : condition,
        ),
        { limit: maxItems },
      );
      setDatas(listData);
    }
  };

  // Crée la condition d'exclusion de l'items ou des items selectionné(s)
  const excludePicked = (c: ModelPredicate<T>) => itemsPick.reduce((criteria, item) => criteria.id('ne', item.id as any), c);

  // Crée la condition de recherche de l'api DataStore
  const getPredicates = (c: ModelPredicate<T>) => {
    if (conditions) {
      return conditions.reduce((criteria, condition) => {
        if (condition) {
          const filterKey = condition.field;
          const filterPredicate = condition.predicateOperator;
          // on force le cast vers "any" car le typage entre DataStore plante
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return criteria[filterKey](filterPredicate as any, valueSearch as any);
        }
        return criteria;
      }, c);
    }
    return c;
  };

  return (
    <AutoComplete
      data={datas}
      itemsPickPicker={(values) => setItemsPick(values)}
      valueSearchPicker={(value) => setValueSearch(value)}
      {...props}
    />
  );
}
