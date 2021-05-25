import axios from 'axios';
import * as  sha256 from 'crypto-js/sha256';

exports.handler = async (event, context) => {
  const brideApiCLient = axios.create({
    baseURL: 'https://sync.bankin.com/v2',
    headers: {
      'Bankin-Version': '2019-02-18',
      'Content-Type':'application/json',
      'Client-Id': process.env.BRIDGE_API_CLIENT_ID,
      'Client-Secret': process.env.BRIDGE_API_CLIENT_SECRET,
    }
  });

  const uuid = event.request.userAttributes.sub;
  const passw = sha256(process.env.BRIDGE_API_CLIENT_ID + uuid).toString();

  try {
    const response = await brideApiCLient.post('/users', {
      email: `${uuid}@bridge-api.omedom.com`,
      password: passw
    });
    console.log(response);
    return {
      statusCode: 200,
      body: JSON.stringify(event)
    }
  } catch (e) {
    console.log(e);
  }
  return {
    statusCode: 400,
    body: JSON.stringify(event)
  }
};
