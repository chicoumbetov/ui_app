/* Amplify Params - DO NOT EDIT
	API_OMEDOMREST_APIID
	API_OMEDOMREST_APINAME
	API_OMEDOM_GRAPHQLAPIENDPOINTOUTPUT
	API_OMEDOM_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import { useGetUserByEmail } from '../../../../../src/API/User';
import { sendEmail } from '../../../../../components/AwsMail/SendMail';
import { useUpdateRealEstateMutation } from '../../../../../src/API/RealEstate';

exports.handler = (event) => {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  const updateRealEstate = useUpdateRealEstateMutation();

  event.Records.forEach(async (record) => {
    if (record.eventName === 'INSERT') {
      const { user } = useGetUserByEmail(record.dynamodb.NewImage.email.S);
      console.log(user);
      if (user.length > 0) {
        console.log(record.dynamodb.NewImage.type.S);
        if (record.dynamodb.NewImage.type.S === 'Admin') {
          await updateRealEstate.updateRealEstate({
            variables: {
              input: {
                id: record.dynamodb.NewImage.realEstateId.S,
                admins: [
                  user[0].id,
                ],
              },
            },
          });
        } else {
          await updateRealEstate.updateRealEstate({
            variables: {
              input: {
                id: record.dynamodb.NewImage.realEstateId.S,
                shared: [
                  user[0].id,
                ],
              },
            },
          });
        }

        sendEmail(record.dynamodb.NewImage.email.S, 'Pirate');
      }
    } console.log(record);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  });
  return Promise.resolve('Successfully processed DynamoDB record');
};
