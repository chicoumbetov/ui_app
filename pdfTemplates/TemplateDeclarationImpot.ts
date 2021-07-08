/**
 * Exemple d'un template mushtache
 */
// eslint-disable-next-line import/prefer-default-export
export const pdfTemplateDeclaration = `
<style>
    * {
        font-size: 13px;
    }
    .container {
      margin: 40px;
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
    tr {
        border: 1px solid black;
    }
    td {
      
      padding: 5px 0 5px 10px;
    }
    h4,
    td div {
      display: flex;
      flex: 1;
      justify-content: center;
      margin: 0;
      margin-top: 5px;
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
      border-left: 1px solid black;
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
            <p>{{bienget.address.address}}</p>
            <p>{{bienget.address.postalCode}} {{bienget.address.city}}</p>
          </td>
        </tr>
      </table>
      
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
          <p>{{startDate}}</p>
        </td>
        <td>
          <p>Départ le</p>
          <p>{{endDate}}</p>
        </td>
      </tr>
    </table>
  
    <div class="header">
          <h3>PROPOSITION DE DECLARATION DES REVENUS FONCIERS</h3>
    </div>
    
      <table >
  
        <tbody >
  
          <tr >
            <td >
              <br>
              <strong>210</strong>
              <br>
              <br>
              <br>
              <br>
              <p>211</p>
              <p>212</p>
              <p>213</p>
              <br>
              <br>
              <p>214</p>
  
              <p><strong>215</strong></p>
  
              <p><strong>220</strong> </p>
              <p>221    <br>
                          <br>
                          <br>
              </p>
              <p>222</p>
              <p>223</p>
              <p>224</p>
              <p>225</p>
              <p>226</p>
              <p>227</p>
              <br>
              <p>228</p>
              <br>
              <br>
              <p>229</p>
              <p>230</p>
              <br>
              <p><strong>240</strong> </p>
              <br>
              <p><strong>250</strong> </p>
              <br>
              <p><strong>260</strong> </p>
              <p>261</p>
              <p>262</p>
              <p><strong>263</strong> </p>
            </td>
            
            
            <td colspan="2">
              <h4>DECLARATION 'NORMALE'</h4>
              <strong>RECETTES </strong>
              <div><p><strong>Immeuble donnés en location</strong></p></div>
  
              <br>
              <p>Loyers (ou fermages) bruts encaissés</p>
              <p>Dépenses mises par convention à la charge des locataires</p>
              <p>Recettes brutes diverses ( y compris subventions ANAH et indemnités d'assurance)</p>
              <br>
              <div><p><strong>Immeubles dont vous vous réservez la jouissance</strong></p></div>
              <p>Valeur locative réelle des propriétés dont vous vous réservez la jouissance</p>
  
              <p><strong>Total des recettes : Lignes 211 à 214</strong></p>
  
              <p><strong>FRAIS ET CHARGES</strong> </p>
              <p>Frais d'administration et de gestion<br>
                      (Rémuneration des gardes  et concierges ; Rémunerations, honoraires et<br>
                      commissions versées à un tiers ; Frais de procédure)
              </p>
              <p>Autres frais de gestion : <strong>{{tenant.managementFees}} € par local</strong></p>
              <p>Primes d'assurances A completer si assurance << en directe >></p>
              <p>Dépenses de réparation, d'entretien et d'amélioration (remplir également la rubrique 400)</p>
              <p>Charges récupérables non réupérées au départ du locataire</p>
              <p>Indemnités d'éviction, frais de relogement</p>
              <p>Taxes foncières, taxes annexes de {{year}}</p>
              <p>     <strong>Régimes particuliers</strong></p>
              <p>Déduction spécifique (sous certaines conditions : voir notice)</p>
              <p>0 % du total de la ligne 215</p>
              <p><strong>Immeubles en copropriété</strong> (uniquement pour les propriétaires bailleurs)</p>
              <p>Provisions pour charges payées en {{date}}</p>
              <p>230    Régularisation des provisions pour charges déduites en {{previousYear}}</p>
              <br>
              <p><strong>Total des frais et charges : lignes 221 à 229 - ligne 230 </strong> </p>
              <br>
              <p><strong>Intérêts d'emprunts</strong> </p>
              <br>
              <p><strong>Revenus fonciers taxables</strong> </p>
              <p>Ligne 215 - ligne 240 - ligne 250 ------------->  A RECALCULER</p>
              <p>Réintégration du supplément de déduction (voir notice)</p>
              <p><strong>Bénefice (+) ou déficit (-): lignes 261 + ligne 262</strong> </p>
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
    
    <p><br>
    <br>
    <br>
      Cette quittance annule tous les reçus qui auraient pu être donnés pour acomptes versés au titre du loyer
      et des charges pour l'échéance correspondante. Le paiement de la présente quittance ne présume pas du paiement des termes précédents.
      A conserver 3 ans après échéance du bail.
    </p>
  </div>`;
