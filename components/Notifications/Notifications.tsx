import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

const Notifications = () =>
/*
  const onPress = () => {
    console.warn('Button pressed');
  };
*/

// eslint-disable-next-line implicit-arrow-linebreak
  (
    <Layout style={styles.container}>
      <Layout style={{ backgroundColor: 'transparent', padding: 26 }}>
        <Text style={{ fontSize: 25, fontWeight: '600' }}>
          Notifications
        </Text>
      </Layout>

      {/* use SectionList to render several accounts with its types and details */}
      <Layout style={styles.compteSection}>
        <Layout style={{
          marginRight: 20, flexDirection: 'row', alignItems: 'center',
        }}
        >
          <Image
            source={require('../../assets/Icones_omedom/logements/icones_log1.png')}
            style={{ height: 40, width: 40, marginRight: 12 }}
          />

          <Text style={{ fontSize: 20, fontWeight: '500' }}>
            Un possible loyer a été détécté !
          </Text>
        </Layout>
      </Layout>

      <Layout style={styles.compteSection}>
        <Layout style={{
          marginRight: 20, flexDirection: 'row', alignItems: 'center',
        }}
        >
          <Image
            source={require('../../assets/Icones_omedom/logements/icones_log1.png')}
            style={{ height: 40, width: 40, marginRight: 12 }}
          />

          <Text style={{ fontSize: 20, fontWeight: '500' }}>
            Votre loyer pour La Maison de JP n'a pas été payé !
          </Text>
        </Layout>
      </Layout>

      <Layout style={styles.compteSection}>
        <Layout style={{
          marginRight: 20, flexDirection: 'row', alignItems: 'center',
        }}
        >
          <Image
            source={require('../../assets/Icones_omedom/logements/icones_log1.png')}
            style={{ height: 40, width: 40, marginRight: 12 }}
          />

          <Text style={{ fontSize: 20, fontWeight: '500' }}>
            Un mouvement négatif a été détécté !
          </Text>
        </Layout>
      </Layout>

      <Layout style={styles.compteSection}>
        <Layout style={{
          marginRight: 20, flexDirection: 'row', alignItems: 'center',
        }}
        >
          <Image
            source={require('../../assets/Icones_omedom/logements/icones_log1.png')}
            style={{ height: 40, width: 40, marginRight: 12 }}
          />

          <Text style={{ fontSize: 20, fontWeight: '500' }}>
            Un possible loyer a été détécté !
          </Text>
        </Layout>
      </Layout>

      <Layout style={styles.compteSection}>
        <Layout style={{
          marginRight: 20, flexDirection: 'row', alignItems: 'center',
        }}
        >
          <Image
            source={require('../../assets/Icones_omedom/logements/icones_log1.png')}
            style={{ height: 40, width: 40, marginRight: 12 }}
          />

          <Text style={{ fontSize: 20, fontWeight: '500' }}>
            Un possible loyer a été détécté !
          </Text>
        </Layout>
      </Layout>
      <Layout style={styles.compteSection}>
        <Layout style={{
          marginRight: 20, flexDirection: 'row', alignItems: 'center',
        }}
        >
          <Image
            source={require('../../assets/Icones_omedom/logements/icones_log1.png')}
            style={{ height: 40, width: 40, marginRight: 12 }}
          />

          <Text style={{ fontSize: 20, fontWeight: '500' }}>
            Un possible loyer a été détécté !
          </Text>
        </Layout>
      </Layout>

    </Layout>

  );
const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: 'rgba(246, 246, 246, 0.5)',
  },
  compteSection: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
  },
});

export default Notifications;
