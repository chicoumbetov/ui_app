import React from 'react';
import {
  Icon, Text,
  // useTheme,
} from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import { useLinkTo } from '@react-navigation/native';
import CompteHeader from './CompteHeader/CompteHeader';

import { MonBienProps } from '../types';
import Card from './Card';

const MonBienResume = (props: MonBienProps) => {
  const { bien } = props;
  // const theme = useTheme();
  const linkTo = useLinkTo();

  const allerDetailsBien = (id: string) => {
    linkTo(`/mes-biens/bien/${id}`);
  };

  return (
    <Card style={{ marginTop: 27 }}>
      <TouchableOpacity
        onPress={() => allerDetailsBien(bien.id)}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <CompteHeader title={bien.name} />
        <IconUIKitten
          name="arrow-ios-forward"
          fill="#b5b5b5"
          style={{
            height: 16, width: 16, marginRight: 5, marginTop: 8,
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 22,
          justifyContent: 'space-between',
        }}
      >
        {/**
           *
           */}
        <View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <View style={{ width: 22, flexDirection: 'row' }}>
              <View style={{ width: 7 }}>
                <IconUIKitten
                  name="arrow-downward"
                  fill="#b5b5b5"
                  style={{ height: 16, width: 16 }}
                />
              </View>
              <IconUIKitten
                name="arrow-upward"
                fill="#b5b5b5"
                style={{
                  height: 16, width: 16, marginRight: 8,
                }}
              />
            </View>

            <Text category="h5" status="success">+ 10 800 €</Text>
          </View>
        </View>

        {/**
           *
           */}

        <View
          style={{
            alignItems: 'center',
            marginRight: 20,
            flexDirection: 'row',
          }}
        >
          <Icon
            name="arrow-downward"
            fill="#b5b5b5"
            style={{ height: 16, width: 16 }}
          />
          <Text category="h4" status="danger">- 160 €</Text>
        </View>

        {/**
           *
           */}
        <View style={{
          flexDirection: 'row',
        }}
        >
          <Icon
            name="trending-up"
            fill="#b5b5b5"
            style={{ height: 18, width: 18, marginRight: 2 }}
          />
          <Text category="h4" status="warning">60 %</Text>
        </View>

      </View>

    </Card>
  );
};

export default MonBienResume;

// const styles = StyleSheet.create({ container: { } });
