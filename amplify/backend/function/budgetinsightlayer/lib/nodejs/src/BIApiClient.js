"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const BIApiKeys_1 = require("./BIApiKeys");
const BIApiClient = (env) => {
    const BIApiCredentials = BIApiKeys_1.default[env];
    let authToken;
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
    const getConnectUrl = async (token, state) => {
        try {
            const response = await BIApiAxiosClient.get('/auth/token/code?type=singleAccess', {
                headers: getAuthHeader(token),
            });
            const redirectUrl = 'https://0patt7mbe7.execute-api.eu-west-2.amazonaws.com/dev/webhooks/item/tea';
            return `${webviewBaseUrl}?client_id=${BIApiCredentials.clientId}&code=${encodeURIComponent(response.data.code)}&redirect_url=${encodeURIComponent(redirectUrl)}&state=${state}`;
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
        clientId: BIApiCredentials.clientId,
        clientSecret: BIApiCredentials.clientSecret,
    };
};
exports.default = BIApiClient;
