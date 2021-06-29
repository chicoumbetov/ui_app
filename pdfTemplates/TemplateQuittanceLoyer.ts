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
    margin-bottom: 80px;
  }
  .bailleur {
    contain: content;
    padding: 15px;
  }
  .bailleur2 {
      contain: content;
      padding: 15px;
      justify-content: flex-end;
  }
  .bailleur p {
    margin-top: 0;
    margin-bottom: 5px;
  }
  table {
    margin-top: 80px;
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
  td p,
   .bailleur2 p {
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
  
      <div class="bailleur2">
        <br>
        <br>
        <p>{{tenant.firstname}} {{tenant.lastname}}</p>
        <p>{{bienget.address.address}} </p>
        <p>{{bienget.address.postalCode}} {{bienget.address.city}}</p>
      </div>
    </div>
    <div>
      <table >
        <tbody>
        <tr>
          <td colspan="2">
            <h2>QUITTANCE DE LOYER</h2>
            <div><p><strong>Période : </strong> du {{startDate}} au {{endDate}}</p></div>
            <div><p><strong>Adresse du logement: </strong> {{bienget.address.address}} {{bienget.address.postalCode}} {{bienget.address.city}}</p></div>
          </td>
        </tr>
        <tr >
          <td >
            <p><strong>PROPRIETAIRE</strong></p>
            <br>
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
          <td >Loyer</td>
          <td>{{rentalFee}} €</td>
        </tr>
        <tr>
          <td >Charges</td>
          <td>{{charges}} €</td>
        </tr>
        <tr>
          <td ><strong>Total</strong></td>
          <td>{{ total }} €</td>
        </tr>
        </tbody>
      </table>
    </div>
  
    <div class="bailleurText">Je soussigné(e) {{user.user.firstname}} {{user.user.lastname}} propriétaire du logement désigné ci-dessus,
      déclaré avoir reçu de la part du locataire l'ensemble des sommes mentionnées au titre du loyer et des charges.
    </div>
  
    <div class="rowBailleur">
      <div>Fait à le {{date}}</div>
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
