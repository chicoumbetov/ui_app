/**
 * Exemple d'un template mushtache
*/
// eslint-disable-next-line import/prefer-default-export
export const pdfTemplateDeclaration = `
<style>
    .container {
      padding: 30px;
    }
    .header {
      border: 1px solid black;
      padding-top: 10px;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    table {
      margin-top: 20px;
      border-collapse: collapse;
      width: 100%;
    }
    tbody {
      display: table;
      width: 100%;
    }
    td {
      border: 1px solid black;
      padding: 5px 0 5px 10px;
    }
    h4,
    td div {
      display: flex;
      flex: 1;
      justify-content: center;
    }
    h3 {
      display: flex;
      justify-content: center;
      margin-top: 5px;
      margin-bottom: 0;
    }
    p {
      margin: 0;
    }
    .secondColumn {
      align-content: center;
    }
  </style>
<div class="container">
  
      <table class="header">
        <tr>
          <td>
            <p>Propriétaire</p>
            <p>Références</p>
            <p>Adresse</p>
          </td>
          <td>
            <p>{{user.user.firstname}} {{user.user.lastname}}</p>
            <p>56116589651</p>
            <p>{{bien.address.address}}</p>
            <p>{{bien.address.postalCode}} {{bien.address.city}}</p>
          </td>
        </tr>
      </table>
  
    <div class="header">
          <h3>PROPOSITION DE DECLARATION DES REVENUS FONCIERS</h3>
    </div>
    <table class="header">
      <tr>
        <td>
          <p>Réf.</p>
          <p>005346 ??????</p>
        </td>
        <td>
          <p>{{tenant.firstname}} {{tenant.lastname}}</p>
          <p>56116589651  ???????</p>
        </td>
        <td>
          <p>Entré le</p>
          <p>{{tenant.startDate}}</p>
        </td>
        <td>
          <p>Départ le</p>
          <p>{{tenant.endDate}}</p>
        </td>
      </tr>
    </table>
      <table >
  
        <tbody >
  
          <tr >
            <td colspan="2">
              <h4>DECLARATION 'NORMALE'</h4>
              <strong>210   RECETTES </strong>
              <div><p><strong>Immeuble donnés en location</strong></p></div>
  
              <br>
              <p>211    Loyers (ou fermages) bruts encaissés</p>
              <p>212    Dépenses mises par convention à la charge des locataires</p>
              <p>213    Recettes brutes diverses ( y compris subventions ANAH et indemnités d'assurance)</p>
              <br>
              <div><p><strong>Immeubles dont vous vous réservez la jouissance</strong></p></div>
              <p>214    Valeur locative réelle des propriétés dont vous vous réservez la jouissance</p>
  
              <p><strong>215    Total des recettes : Lignes 211 à 214</strong></p>
  
              <p><strong>220    FRAIS ET CHARGES</strong> </p>
              <p>221    Frais d'administration et de gestion<br>
                      (Rémuneration des gardes  et concierges ; Rémunerations, honoraires et<br>
                      commissions versées à un tiers ; Frais de procédure)
              </p>
              <p>222    Autres frais de gestion : <strong>{{tenant.managementFees}} € par local</strong></p>
              <p>223    Primes d'assurances A completer si assurance << en directe >></p>
              <p>224    Dépenses de réparation, d'entretien et d'amélioration (remplir également la rubrique 400)</p>
              <p>225    Charges récupérables non réupérées au départ du locataire</p>
              <p>226    Indemnités d'éviction, frais de relogement</p>
              <p>227    Taxes foncières, taxes annexes de {{date}}????? 2016</p>
              <p>     <strong>Régimes particuliers</strong></p>
              <p>228   Déduction spécifique (sous certaines conditions : voir notice)</p>
              <p>     0 % du total de la ligne 215</p>
              <p>     <strong>Immeubles en copropriété</strong> (uniquement pour les propriétaires bailleurs)</p>
              <p>229    Provisions pour charges payées en {{date}}</p>
              <p>230    Régularisation des provisions pour charges déduites en { {{date}}-1}??????2015</p>
              <br>
              <p><strong>240            Total des frais et charges : lignes 221 à 229 - ligne 230 </strong> </p>
              <br>
              <p><strong>250    Intérêts d'emprunts</strong> </p>
              <br>
              <p><strong>260    Revenus fonciers taxables</strong> </p>
              <p>261    Ligne 215 - ligne 240 - ligne 250 ------------->  A RECALCULER</p>
              <p>262    Réintégration du supplément de déduction (voir notice)</p>
              <p><strong>263    Bénefice (+) ou déficit (-): lignes 261 + ligne 262</strong> </p>
            </td>
  
  
            <td class="secondColumn">
              <p>0</p>
              <br>
              <br>
              <br>
              <br>
              <br>
              <br>
              <p>0</p>
              <br>
              <br>
              <br>
              <br>
              <br>
              <p>A RENSEIGNER</p>
              <br>
              <br>
              <br>
              <br>
              <br>
              <p>A RENSEIGNER</p>
              <br>
              <br>
              <p>A RENSEIGNER</p>
  
            </td>
          </tr>
  
        </tbody>
      </table>
  
    <p>Cette quittance annule tous les reçus qui auraient pu être donnés pour acomptes versés au titre du loyer
      et des charges pour l'échéance correspondante. Le paiement de la présente quittance ne présume pas du paiement des termes précédents.
      A conserver 3 ans après échéance du bail.
    </p>
  </div>`;
