/**
 * Mock data for all components that need to take name
 *
 * @author: Shynggys UMBETOV
 */

const clientData = {
  Client: {
    name: 'Client',
    fields: [{
      id: 'c1',
      nom: 'Matthieu',
      prenom: 'Roma',
      email: 'shynggys@web-premiere.fr',
      motDePasse: '1234',
      numeroTel: '0766198985',
      dateDeNaissance: '06/05/1990',
    }, {
      id: 'c2',
      nom: 'Gerard',
      prenom: 'Matthieu',
      email: 'gerard@web-premiere.fr',
      motDePasse: '4321',
      numeroTel: '0712341234',
      dateDeNaissance: '15/05/1990',
    },
    ],
  },
  AdresseType: {
    name: 'AdresseType',
    fields: [{
      id: 'a1',
      adresse: '12 rue Chirac',
      complementAdresse: 'Deviniere',
      codePostal: '81000',
      ville: 'Toulouse',
      pays: 'France',
    }, {
      id: 'a2',
      adresse: '12 rue Chirac',
      complementAdresse: 'Deviniere',
      codePostal: '81000',
      ville: 'Toulouse',
      pays: 'France',
    },
    ],
  },
};

export default clientData;
