import React from 'react';
import {
  Icon, Layout, Text,
  // useTheme,
} from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';
import { Icon as IconUIKitten } from '@ui-kitten/components/ui/icon/icon.component';
import { useLinkTo } from '@react-navigation/native';
import CompteHeader from './CompteHeader/CompteHeader';
import MaxWidthContainer from './MaxWidthContainer';
import { CompteType } from '../types';

const MonBienResume = (props: CompteType) => {
  const { title } = props;
  // const theme = useTheme();
  const linkTo = useLinkTo();

  const allerDetailsBien = () => {
    linkTo('/mes-biens/bien/:id');
  };

  return (
    <MaxWidthContainer>
      <Layout style={{
        flexDirection: 'column', marginTop: 28, padding: 17, borderRadius: 10,
      }}
      >
        <TouchableOpacity onPress={allerDetailsBien} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <CompteHeader title={title} />
          <IconUIKitten
            name="arrow-ios-forward"
            fill="#b5b5b5"
            style={{
              height: 16, width: 16, marginRight: 5, marginTop: 8,
            }}
          />
        </TouchableOpacity>

        <Layout style={{
          flexDirection: 'row',
          marginTop: 22,
          justifyContent: 'space-between',
        }}
        >
          {/**
           *
           */}
          <Layout>
            <Layout style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}
            >
              <Layout style={{ width: 22, flexDirection: 'row' }}>
                <Layout style={{ width: 7 }}>
                  <IconUIKitten
                    name="arrow-downward"
                    fill="#b5b5b5"
                    style={{ height: 16, width: 16 }}
                  />
                </Layout>
                <IconUIKitten
                  name="arrow-upward"
                  fill="#b5b5b5"
                  style={{
                    height: 16, width: 16, marginRight: 8,
                  }}
                />
              </Layout>

              <Text category="h5" status="success">+ 10 800 €</Text>
            </Layout>
          </Layout>

          {/**
           *
           */}

          <Layout style={{
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
          </Layout>

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

        </Layout>

      </Layout>
    </MaxWidthContainer>
  );
};

export default MonBienResume;

// const styles = StyleSheet.create({ container: { } });
