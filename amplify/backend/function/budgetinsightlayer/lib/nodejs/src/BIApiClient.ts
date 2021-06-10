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

  const getConnectionAccounts = async (user_token: string, connection_id: number) => {
    try {
      const response = await BIApiAxiosClient.get(`/users/me/connections/${connection_id}?expand=accounts,connector`, {
        headers: getAuthHeader(user_token),
      });
      console.log(response.data);
      return response.data;
    } catch (e) {
      return false;
    }
  };

  const getReconnectUrl = async (
    token: string,
    redirectUrl: string,
    connectionId: number,
    state?: string,
  ) => {
    try {
      const response = await BIApiAxiosClient.get('/auth/token/code?type=singleAccess', {
        headers: getAuthHeader(token),
      });

      return `${webviewBaseUrl}reconnect?client_id=${BIApiCredentials.clientId}&connection_id=${connectionId}&code=${encodeURIComponent(response.data.code)}&redirect_url=${encodeURIComponent(redirectUrl)}&state=${state}`;
    } catch (e) {
      return false;
    }
  };

  return {
    createUser,
    getConnectUrl,
    getReconnectUrl,
    getConnectionAccounts,
    clientId: BIApiCredentials.clientId,
    clientSecret: BIApiCredentials.clientSecret,
  };
};

export default BIApiClient;

console.log('test');

const client = BIApiClient('dev');
client.getConnectionAccounts('LdnTunKSkaOBH1UMhqQum_hCL6z_XANrxqdRk9xX9zPl2Dr7O/DE1jrBbhz0uBqgNnSs3oNw0XPe/dtM9xXL8usLi9UZjKDon1cqqT15qHdZ6/s2Ul5/eBkcaVHAeDvt', 4);
