import React from 'react';
import { Text } from '@ui-kitten/components';

import { Alert, View } from 'react-native';

import { useForm } from 'react-hook-form';

import { useLinkTo } from '@react-navigation/native';
import Button from '../../components/Button';
import contactDATA from '../../mockData/contactDATA';
import TextInput from '../../components/Form/TextInput';
import SelectComp from '../../components/Form/Select';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import Form from '../../components/Form/Form';

import { sendTemplateEmail } from '../../components/AwsMail/SendMail';
import { useUser } from '../../src/API/UserContext';
import { AvailableValidationRules } from '../../components/Form/validation';

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
        'Votre message a été envoyé avec succès !',
        '',
        [
          { text: 'Ok', onPress: () => linkTo('/tableau-de-bord') },
        ],
        { cancelable: false },
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
          <SelectComp
            name="type"
            data={contactDATA}
            placeholder="Motif Contact"
            size="large"
            appearance="default"
            status="primary"
            validators={[
              AvailableValidationRules.required,
            ]}
          />
          <View style={{ backgroundColor: 'transparent', marginTop: 15 }}>
            <TextInput
              name="message"
              label="Votre Message"
              placeholder="Saisissez votre texte ici"
              multiline
              numberOfLines={5}
              validators={[
                AvailableValidationRules.required,
              ]}
            />
          </View>
          <View style={{ alignItems: 'flex-end', backgroundColor: 'transparent', marginTop: 30 }}>
            <Button onPress={contactMessageForm.handleSubmit((data) => ContactSend(data))} size="large">Envoyer</Button>
          </View>
          <Text category="c1" appearance="hint">
            * champs obligatoires
          </Text>
        </>
      </Form>
    </MaxWidthContainer>

  );
}

export default Contact;

// const styles = StyleSheet.create({});
