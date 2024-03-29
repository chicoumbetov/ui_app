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
                  'ajout-bien-screen': '/ajouter',
                  'detail-bien': '/:id',
                  'mon-budget': '/:id/budget',
                  'ajout-revenu': '/:id/budget/ajout-revenu',
                  'modifier-revenu': '/:id/budget/modifier-revenu/:idBudgetLine',

                  'ajout-charge': '/:id/budget/ajout-charge',
                  'modifier-charge': '/:id/budget/modifier-charge/:idBudgetLine',

                  'mes-rapports': '/mes-rapports/:id',

                  'mes-rapports-biens1': '/mes-rapports-biens1/:id',
                  'mes-rapports-biens2': '/mes-rapports-biens2/:id',
                  'modifier-characteristique': '/:id/modifier-characteristique',
                  'partager-bien': '/:id/partager-bien',
                },
              },
              'mes-charges-nav': {
                path: 'mes-charges',
                screens: {
                  'mes-charges': '/',
                  'mes-charges-2': '/mes-charges-2/:title',
                  'mes-charges-3': '/mes-charges-3/:title',
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
                initialRouteName: 'mon-assistant',
                screens: {
                  'mon-assistant': '/',
                  'declaration-impots': '/declaration-impots',
                  'declaration-impots-2': '/declaration-impots/:idBien',
                  'quittance-loyer': '/quittance-loyer',
                  'quittance-loyer-2': '/quittance-loyer/:idBien',
                },
              },
              notifications: {
                path: 'notifications',
                initialRouteName: 'notifications',
                screens: {
                  notifications: '/',
                  'notifications-params': '/parametres',
                },
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
              'ma-tresorerie-2': ':id/mes-comptes/',
              'mouv-bancaires': ':id/mes-comptes/:idCompte/mouvements-bancaires',
              'affecter-mouvement': ':id/mes-comptes/:idCompte/mouvements-bancaires/affectes/',
              'ignorer-mouvement': ':id/mes-comptes/:idCompte/mouvements-bancaires/ignores/',
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
