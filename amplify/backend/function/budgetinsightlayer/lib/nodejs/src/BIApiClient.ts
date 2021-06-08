import axios from 'axios';
import BIApiKeys from './BIApiKeys';

const BIApiClient = (env: 'dev' | 'prod') => {
  const BIApiCredentials = BIApiKeys[env];

  const webviewBaseUrl = `https://${BIApiCredentials.domain}.biapi.pro/2.0/auth/webview/`;

  const getAuthHeader = (token: string) => ({
    Authorization: `Bearer ${token}`,
  });

  const BIApiAxiosClient = axios.create({
    baseURL: `https://${BIApiCredentials.domain}.biapi.pro/2.0/`,
  });

  const createUser = async () => {
    const response = await BIApiAxiosClient.post('/auth/init', {
      client_id: BIApiCredentials.clientId,
      client_secret: BIApiCredentials.clientSecret,
    });
    return response;
  };

  const getConnectUrl = async (token: string, redirectUrl: string, state?: string) => {
    try {
      const response = await BIApiAxiosClient.get('/auth/token/code?type=singleAccess', {
        headers: getAuthHeader(token),
      });

      return `${webviewBaseUrl}?client_id=${BIApiCredentials.clientId}&code=${encodeURIComponent(response.data.code)}&redirect_url=${encodeURIComponent(redirectUrl)}&state=${state}`;
    } catch (e) {
      return false;
    }
  };

  const getMFAUrl = (account: number) => {

  };

  return {
    createUser,
    getConnectUrl,
    getMFAUrl,
    clientId: BIApiCredentials.clientId,
    clientSecret: BIApiCredentials.clientSecret,
  };
};

export default BIApiClient;
