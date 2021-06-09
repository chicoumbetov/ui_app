"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const BIApiKeys_1 = require("./BIApiKeys");
const BIApiClient = (env) => {
    const BIApiCredentials = BIApiKeys_1.default[env];
    const webviewBaseUrl = `https://${BIApiCredentials.domain}.biapi.pro/2.0/auth/webview/`;
    const getAuthHeader = (token) => ({
        Authorization: `Bearer ${token}`,
    });
    const BIApiAxiosClient = axios_1.default.create({
        baseURL: `https://${BIApiCredentials.domain}.biapi.pro/2.0/`,
    });
    const createUser = async () => {
        const response = await BIApiAxiosClient.post('/auth/init', {
            client_id: BIApiCredentials.clientId,
            client_secret: BIApiCredentials.clientSecret,
        });
        return response;
    };
    const getConnectUrl = async (token, redirectUrl, state) => {
        try {
            const response = await BIApiAxiosClient.get('/auth/token/code?type=singleAccess', {
                headers: getAuthHeader(token),
            });
            return `${webviewBaseUrl}?client_id=${BIApiCredentials.clientId}&code=${encodeURIComponent(response.data.code)}&redirect_url=${encodeURIComponent(redirectUrl)}&state=${state}`;
        }
        catch (e) {
            return false;
        }
    };
    const getAccounts = async (user_token, connection_id) => {
        try {
            const response = await BIApiAxiosClient.get(`/users/me/connections/${connection_id}?expand=accounts`, {
                headers: getAuthHeader(user_token),
            });
            console.log(response.data);
        }
        catch (e) {
            return false;
        }
    };
    const getMFAUrl = (account) => {
    };
    return {
        createUser,
        getConnectUrl,
        getMFAUrl,
        getAccounts,
        clientId: BIApiCredentials.clientId,
        clientSecret: BIApiCredentials.clientSecret,
    };
};
exports.default = BIApiClient;
console.log('test');
const client = BIApiClient('dev');
client.getAccounts('LdnTunKSkaOBH1UMhqQum_hCL6z_XANrxqdRk9xX9zPl2Dr7O/DE1jrBbhz0uBqgNnSs3oNw0XPe/dtM9xXL8usLi9UZjKDon1cqqT15qHdZ6/s2Ul5/eBkcaVHAeDvt', 4);
