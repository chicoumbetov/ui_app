import axios from 'axios';
import bridgeApiKeys from './BridgeApiKeys';

const BridgeApiClient = (env: 'dev' | 'prod') => {
  const bridgeApiCredentials = bridgeApiKeys[env];
  let authToken: string | undefined;

  const bridgeApiClient = axios.create({
    baseURL: 'https://sync.bankin.com/v2',
    headers: {
      'Bankin-Version': '2019-02-18',
      'Content-Type': 'application/json',
      'Client-Id': bridgeApiCredentials.clientId,
      'Client-Secret': bridgeApiCredentials.clientSecret,
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
  });

  const createUser = async (email: string, password: string) => {
    const response = await bridgeApiClient.post('/users', {
      email,
      password,
    });
    return response;
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await bridgeApiClient.post('/authenticate', {
        email,
        password,
      });
      authToken = response.data.access_token;
      return true;
    } catch (e) {
      return false;
    }
  };

  const getBridgeUrl = async (context?: string) => {
    try {
      const response = await bridgeApiClient.get(`/connect/items/add/url?country=fr&capabilities=ais${context ? `&context=${context}` : ''}`);
      return response.data.redirect_url;
    } catch (e) {
      return false;
    }
  };

  const getMFAUrl = (account: number) => {

  };

  const listTransactionSince = (account: number, date: string) => {

  };

  return {
    createUser,
    login,
    getBridgeUrl,
    getMFAUrl,
    clientId: bridgeApiCredentials.clientId,
    clientSecret: bridgeApiCredentials.clientSecret,
  };
};

export default BridgeApiClient;
