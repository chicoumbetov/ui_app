import React from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';

import { StyleSheet } from 'react-native';

import contactDATA from '../../mockData/contactDATA';
import TextInput from '../../components/Form/TextInput';
import SelectComp from '../../components/Form/Select';
import MaxWidthContainer from '../../components/MaxWidthContainer';

const Contact = () => (
  <MaxWidthContainer>

    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>Contact</Text>

      <SelectComp name="contact" data={contactDATA} placeholder="Motif Contact" size="large" appearance="default" status="primary" />

      <Layout style={{ backgroundColor: 'transparent', marginTop: 15 }}>
        <TextInput
          name="Votre Message"
          label="Votre Message"
          placeholder="Saisissez votre texte ici"
        />
      </Layout>

      <Layout style={{ alignItems: 'flex-end', backgroundColor: 'transparent', marginTop: 30 }}>
        <Button size="large">Envoyer</Button>
      </Layout>
    </Layout>

  </MaxWidthContainer>

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
    marginTop: 19.7,
    marginBottom: 14,
    lineHeight: 27.4,
  },
});
