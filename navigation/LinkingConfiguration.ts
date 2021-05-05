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
                path: 'mes-biens',
                screens: {
                  'mes-biens': '/',
                  DetailsBien: '/bien/:id',
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
