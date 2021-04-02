import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabMesBiensScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabMesChargesScreen: 'two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
