import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          'bottom-tab-nav': {
            path: '',
            screens: {
              'mes-biens-nav': {
                initialRouteName: 'mes-biens',
                path: 'mes-biens',
                screens: {
                  'mes-biens': '/',
                  'detail-bien': '/bien/:id',
                  'mes-rapports': '/mes-rapports',
                  'ajout-revenu': '/bien/:id/ajout-revenu',
                  'ajout-bien-screen': '/ajouter',
                },
              },
              'mes-charges-nav': {
                path: 'mes-charges',
                screens: {
                  'mes-charges': '/',
                },
              },
              'tableau-de-bord': {
                path: 'tableau-de-bord',
                screens: {
                  'mes-charges': '/',
                },
              },
              'mon-assistant-nav': {
                path: 'mon-assistant',
                screens: {
                  'mon-assistant': '/',
                },
              },
              notifications: {
                path: 'notifications',
              },
            },
          },
          'mon-compte-nav': {
            path: 'mon-compte',
            screens: {
              'mon-compte': '/',
            },
          },
          'ma-tresorerie-nav': {
            path: 'ma-tresorerie',
            screens: {
              'ma-tresorerie': '/',
            },
          },
          faq: 'faq',
          contact: 'contact',
        },
      },
      NotFound: '*',
    },
  },
};
