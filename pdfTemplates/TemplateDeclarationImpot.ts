/**
 * Exemple d'un template mushtache
*/
export const pdfTemplateDeclaration = `
<style>
    .row{
        display: flex;
    }
    .client{
        width: 50%;
    }
    .obliger{
        width: 50%;
    }
</style>
<div>
    <div class="container">
        <div class="row">
            <div class="client">
                <h2>Client</h2>
                <p>Nom</p>
            </div>
           
            <div class="obliger">
                <h2>Obliger</h2>
            </div>
        </div>
    </div>
    <div class="wincap">
        <h2>Déclaration impôts</h2>
    </div> 
</div>`;
