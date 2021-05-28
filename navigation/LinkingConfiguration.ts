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
                  'mon-budget': '/bien/:id/budget',
                  'ajout-revenu': '/bien/:id/budget/ajout-revenu',
                  'modifier-revenu': '/bien/:id/budget/modifier-revenu/:idBudgetLine',
                  'ajout-bien-screen': '/ajouter',

                  'ajout-charge': '/bien/:id/budget/ajout-charge',
                  'modifier-charge': '/bien/:id/budget/modifier-charge/:idBudgetLine',

                  'mes-rapports': '/mes-rapports',
                  'mes-rapports-biens1': '/mes-rapports-biens1',
                  'mes-rapports-biens2': '/mes-rapports-biens2',
                  'modifier-characteristique': '/bien/:id/modifier-characteristique',
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
                  'tableau-de-bord': 'tableau-de-bord/',
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
            initialRouteName: 'mon-compte',
            path: 'mon-compte',
            screens: {
              'mon-compte': '/',
              'modifier-info-1': '/modifier',
              verification: '/modifier/verification',
              'modifier-info-2': '/modifier/etape-2',
              'modifier-info-3': '/modifier/etape-3',
            },
          },
          'ma-tresorerie-nav': {
            path: 'ma-tresorerie',
            screens: {
              'ma-tresorerie': '/',
              'mouv-bancaires': 'mouvement-bancaires',
              'ignorer-mouvement': 'ignorer-mouvement',
              'edit-mouvement': 'edit-mouvement',
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
