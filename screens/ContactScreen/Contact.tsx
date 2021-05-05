import React from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';

import {
  StyleSheet,
} from 'react-native';

import contactDATA from '../../mockData/contactDATA';
import TextInput from '../../components/Form/TextInput';
import SelectComp from '../../components/Form/Select';

const Contact = () => (
  <Layout style={styles.containerOut}>

    <Layout style={styles.container}>
      <Text style={styles.title}>Contact</Text>

      <SelectComp name="contact" data={contactDATA} placeholder="Motif Contact" size="large" appearance="default" status="primary" />

      <TextInput
        name="Votre Message"
        label="Votre Message"
        placeholder="Saisissez votre texte ici"
      />

      <Layout style={{ alignItems: 'flex-end', backgroundColor: 'transparent', marginTop: 30 }}>
        <Button size="large">Envoyer</Button>
      </Layout>
    </Layout>

  </Layout>

);

export default Contact;

const styles = StyleSheet.create({
  containerOut: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  container: {
    padding: 25,
    paddingRight: 21,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 25.7,
    marginTop: 19.7,
    marginBottom: 14,
    lineHeight: 27.4,
    letterSpacing: 0.1,
    fontFamily: 'HouschkaRoundedDemiBold',
  },
});
