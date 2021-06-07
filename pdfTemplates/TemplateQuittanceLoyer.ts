/**
 * Exemple d'un template mushtache
 *
 */
const pdfTemplateQuittance = `
<style>
  .container {
    width: auto;
    padding: 30px;
  }
  .rowBailleur {
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: space-between;
  }
  .bailleur {
    flex: 1;
    padding: 15px;
  }
  .bailleur p {
    margin-top: 0;
    margin-bottom: 5px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  tbody {
    width: auto;
    flex-direction: column;
    border-collapse: collapse;
  }
  td {
    border: 1px solid black;
    padding: 5px 0 5px 10px;
  }
  td p {
    margin-top: 5px;
    margin-bottom: 0;
  }
  .column {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  td div {
    display: flex;
    flex: 1;
    justify-content: center;
  }
  h2 {
    display: flex;
    flex: 1;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 0;
  }
  h3 {
    margin: 0;
  }
  .bailleurText {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
<div class="container">
    <div class="rowBailleur">
      <div class="bailleur">
        <p>{{user.user.firstname}} {{user.user.lastname}}</p>
      </div>
  
      <div class="bailleur">
        <p>{{tenant.firstname}} {{tenant.lastname}}</p>
        <p>{{bien.address.address}} </p>
        <p>{{bien.address.postalCode}} {{bien.address.city}}</p>
      </div>
    </div>
    <div>
      <table >
        <tbody>
        <tr colspan="2">
          <td >
            <h2>QUITTANCE DE LOYER</h2>
            <div><p><strong>Période : </strong> du 01/01/2020 au 31/01/2020</p></div>
            <div><p><strong>Adresse du logement: </strong> {{bien.address.address}} {{bien.address.postalCode}} {{bien.address.city}}</p></div>
          </td>
        </tr>
        <tr >
          <td>
            <strong>PROPRIETAIRE</strong>
            <p>{{user.user.firstname}} {{user.user.lastname}}</p>
          </td>
          <td>
            <strong>LOCATAIRE</strong>
            <p>{{tenant.firstname}} {{tenant.lastname}}</p>
          </td>
        </tr>
        <tr>
          <td><h3><strong>Détail du réglement</strong></h3></td>
          <td><h3><strong>Montant</strong></h3></td>
        </tr>
        <tr>
          <td>Loyer</td>
          <td>{{tenant.amount}} €</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>{{ tenant.rentalCharges}} €</td>
        </tr>
        </tbody>
      </table>
    </div>
  
    <div class="bailleurText">Je soussigné(e) {{user.user.firstname}} {{user.user.lastname}} propriétaire du logement désigné ci-dessus,
      déclaré avoir reçu de la part du locataire l'ensemble des sommes mentionnées au titre du loyer et des charges.
    </div>
  
    <div class="rowBailleur">
      <div>Fait à le 17/03/2020</div>
      <div>
        <p>Le bailleur</p>
        <p>{{user.user.firstname}} {{user.user.lastname}}</p>
      </div>
    </div>
  
    <p>Cette quittance annule tous les reçus qui auraient pu être donnés pour acomptes versés au titre du loyer
      et des charges pour l'échéance correspondante. Le paiement de la présente quittance ne présume pas du paiement des termes précédents.
      A conserver 3 ans après échéance du bail.
    </p>
  </div>`;

export default pdfTemplateQuittance;
