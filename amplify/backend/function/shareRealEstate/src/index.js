exports.handler = (event) => {
  //eslint-disable-line
  event.Records.forEach((record) => {
    if (record.eventName === 'INSERT') {
      console.log(record.dynamodb.NewImage.email.S);
    }
  });
  return Promise.resolve('Successfully processed DynamoDB record');
};
