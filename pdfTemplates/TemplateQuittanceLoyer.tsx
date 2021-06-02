/**
 * Exemple d'un template mushtache
 *
 */
export const pdfTemplateQuittance = `
<style>
    .row{
        display: flex;
    }
    .tenant{
        width: 50%;
    }
    .locataire{
        width: 50%;
    }
    .details{
        width: 50%;
    }
</style>
<div>
    <div class="container">
        <div class="row">
            <div class="bailleur">
                <h2>Bailleur</h2>
                <p>{{bien.lastname}} {{bien.firstname}}</p>
                <p>{{bien.address}}</p>
                <p>{{bien.postalCode}} {{bien.city}}</p>
            </div>
           
            <div class="locataire">
                <h2>Locataire Destinataire</h2>
                <p>{{tenant.firstname}} {{tenant.lastname}}</p>
                <p>{{tenant.address}}</p>
                <p>{{tenant.postalCode}} {{tenant.city}}</p>
                <p>{{tenant.phoneNumber}}</p>
            </div>
        </div>
    </div>
    <div class="quittance">
        <h2>Quittance de loyer</h2>
        
        <p>Loyer du startDate au endDate 2021</p>
        <div class="row">
            <div class="locataire">
                <h2>Locataire Destinataire</h2>
                <p>Reçu de : {{tenant.firstname}} {{tenant.lastname}} </p>
                <p>La somme de {bien.amount}</p>
                <p>Le 01/04/2021</p>
                <p>Pour le loyer de la chambre N2 situé dans {bien.name}</p>
                <p>{{tenant.address}}</p>
                <p>{{tenant.postalCode}} {{tenant.city}}</p>
                
                <p>en paiment du terme du mois de  Avril 2021</p>
                
                <p>Fait à Réalmont le 19/05/2021</p>
                <p>Photo de signature</p>
                <p>Nom prénom de proprietaire</p>
            </div>
            
            <div class="details">
                <h4>Détails</h4>
                <p>- Loyer nu: 270 €</p>
                <p>- Charges : 80 €</p>
                <p>Montant total du terme : 350 €</p>
                <p>- Paiement locataire : 350 €</p>
                <p>- Solde à payer : 0 €</p>
            </div>
        </div>
        <div>Dont quittance, sous réserve de tous les droits et action du propriétaire, 
        de toutes poursuits qui auraient pu être engagés. <strong>En cas de congé précédemment donné, 
        cette quittance représenterait une indemnité d'occupation des lieux et ne saurait être considérée comme une titre de location.</strong></br>
        Cette quittance annule tous les reçus quit auraient pu être données pour acomptes versés, 
        même si ces reçus portent une date postérieure à la date ci-contre. 
        Le paiment de la présente quittance n'emporte pas présomption de paiement des termes antérieurs.
        </div>
            
    </div> 
</div>`;
