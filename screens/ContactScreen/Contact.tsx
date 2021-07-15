import React from 'react';
import { Button, Text } from '@ui-kitten/components';

import { Alert, View } from 'react-native';

import { useForm } from 'react-hook-form';

import { useLinkTo } from '@react-navigation/native';
import contactDATA from '../../mockData/contactDATA';
import TextInput from '../../components/Form/TextInput';
import SelectComp from '../../components/Form/Select';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import Form from '../../components/Form/Form';

import { sendTemplateEmail } from '../../components/AwsMail/SendMail';
import { useUser } from '../../src/API/UserContext';

type ContactMessageForm = {
  type: string,
  message: string,
};

function Contact() {
  // const navigation = useNavigation();
  const contactMessageForm = useForm<ContactMessageForm>();
  const { user } = useUser();
  const linkTo = useLinkTo();
  // console.log('user :', user.email);
  const ContactSend = async (data : ContactMessageForm) => {
    if (user && user.email) {
    // console.log('data : ', data);
      const title = `${`Mail de ${user.firstname} ${user.lastname} : `}${data.type}`;
      const body = data.message;
      await sendTemplateEmail(user?.email, { title, body });
      // navigation.pop();
      Alert.alert(
        'Votre message a été envoyé avec success !',
        '',
        [
          { text: 'Ok', onPress: () => linkTo('/tableau-de-bord') },
        ],
        { cancelable: true },
      );
    }
  };
  return (
    <MaxWidthContainer
      outerViewProps={{
        style: {
          padding: 25,
          paddingRight: 21,
        },
      }}
    >
      <Form<ContactMessageForm> {...contactMessageForm}>
        <>
          <Text
            category="h1"
            style={{
              marginTop: 19.7,
              marginBottom: 14,
            }}
          >
            Contact
          </Text>
          <SelectComp name="type" data={contactDATA} placeholder="Motif Contact" size="large" appearance="default" status="primary" />
          <View style={{ backgroundColor: 'transparent', marginTop: 15 }}>
            <TextInput
              name="message"
              label="Votre Message"
              placeholder="Saisissez votre texte ici"
            />
          </View>
          <View style={{ alignItems: 'flex-end', backgroundColor: 'transparent', marginTop: 30 }}>
            <Button onPress={contactMessageForm.handleSubmit((data) => ContactSend(data))} size="large">Envoyer</Button>
          </View>
        </>
      </Form>
    </MaxWidthContainer>

  );
}

export default Contact;

// const styles = StyleSheet.create({});
