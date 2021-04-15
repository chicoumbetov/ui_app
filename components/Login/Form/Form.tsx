/**
 * Création d'une celulle d'une ligne
 *
 * @author:
 */
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Layout, Input, Button } from '@ui-kitten/components';

type FormValues = {
  email: string;
  password: string;
};

const Form = () => {
  // const [value, setValue] = React.useState('');
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <Layout>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Email"
            value={value}
            onChangeText={(nextValue) => onChange(nextValue)}
          />
        )}
        name="email"
        defaultValue=""
      />
      <Button onPress={handleSubmit(onSubmit)}>Submit</Button>

    </Layout>
  );
};

export default Form;
