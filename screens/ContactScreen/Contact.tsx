import React from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';

import { StyleSheet } from 'react-native';

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import contactDATA from '../../mockData/contactDATA';
import TextInput from '../../components/Form/TextInput';
import SelectComp from '../../components/Form/Select';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import Form from '../../components/Form/Form';

import { sendEmail } from '../../components/AwsMail/SendMail';
import { useUser } from '../../src/API/UserContext';

type ContactMessageForm = {
  type: string,
  message: string,
};

function Contact() {
  const navigation = useNavigation();
  const contactMessageForm = useForm<ContactMessageForm>();
  const { user } = useUser();
  console.log('user :', user.email);
  const ContactSend = async (data : ContactMessageForm) => {
    console.log('data : ', data);

    await sendEmail(user?.email, data.type, data.message);
    // navigation.pop();
  };
  return (
    <MaxWidthContainer>
      <Form<ContactMessageForm> {...contactMessageForm}>

        <Layout style={styles.container}>
          <Text category="h1" style={styles.title}>Contact</Text>

          <SelectComp name="type" data={contactDATA} placeholder="Motif Contact" size="large" appearance="default" status="primary" />

          <Layout style={{ backgroundColor: 'transparent', marginTop: 15 }}>
            <TextInput
              name="message"
              label="Votre Message"
              placeholder="Saisissez votre texte ici"
            />
          </Layout>

          <Layout style={{ alignItems: 'flex-end', backgroundColor: 'transparent', marginTop: 30 }}>
            <Button onPress={contactMessageForm.handleSubmit((data) => ContactSend(data))} size="large">Envoyer</Button>
          </Layout>
        </Layout>
      </Form>
    </MaxWidthContainer>

  );
}

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
