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

    }
    td {

        padding: 2px 0 2px 10px;
        vertical-align: top;
    }
    td:last-child {
        text-align: right;
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
        padding: 0;
    }
    .secondColumn {
        justify-content: flex-start;
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
                <p></p>
            </td>
            <td>
                <p></p>
            </td>
            <td>
                <div>Entré le 01/01/{{year}}</div>
            </td>
            <td>
                <div>Départ le 31/12/{{year}}</div>
            </td>
        </tr>
    </table>

    <div class="header">
        <h3>PROPOSITION DE DECLARATION DES REVENUS FONCIERS</h3>
    </div>

    <table >

        <tbody >

        <tr style="border-top: 1px solid black">
            <td style="border-left: 1px solid black">
            </td>
            <td ><div><strong>DECLARATION 'NORMALE'</strong></div></td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black"></td>
        </tr>
        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <strong>210</strong>
            </td>
            <td><strong>RECETTES</strong></td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black"></td>
        </tr>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <p/>
            </td>
            <td><div><p><strong>Immeuble donnés en location</strong></p></div></td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black"></td>
        </tr>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <p>211</p>
            </td>
            <td><p>Loyers (ou fermages) bruts encaissés</p></td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>{{formatedLineTotals.211}}</p>
            </td>
        </tr>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <p>212</p>
            </td>
            <td><p>Dépenses mises par convention à la charge des locataires</p></td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>{{formatedLineTotals.212}}</p>
            </td>
        </tr>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <p>213</p>
            </td>
            <td><p>Recettes brutes diverses ( y compris subventions ANAH et indemnités d'assurance)</p></td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>{{formatedLineTotals.213}}</p>
            </td>
        </tr>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <p/>
            </td>
            <td><div><p><strong>Immeubles dont vous vous réservez la jouissance</strong></p></div></td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black"></td>
        </tr>




        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <p>214</p>
            </td>
            <td><p>Valeur locative réelle des propriétés dont vous vous réservez la jouissance</p></td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">

            </td>
        </tr>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <strong><p>215</p></strong>
            </td>
            <td><p><strong>Total des recettes : Lignes 211 à 214</strong></p></td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>{{formatedLineTotals.215}}</p>
            </td>
        </tr>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <strong><p>220</p></strong>
            </td>
            <td><p><strong>FRAIS ET CHARGES</strong></p></td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black"></td>
        </tr>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <strong><p>221</p></strong>
            </td>
            <td>
                <p>Frais d'administration et de gestion<br>
                    (Rémuneration des gardes  et concierges ; Rémunerations, honoraires et<br>
                    commissions versées à un tiers ; Frais de procédure)
                </p>
            </td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>{{formatedLineTotals.221}}</p>
            </td>
        </tr>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <strong><p>222</p></strong>
            </td>
            <td>
                <p>Autres frais de gestion : <strong>{{tenant.managementFees}} € par local</strong></p>
            </td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>{{formatedLineTotals.222}}</p>
            </td>
        </tr>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <strong><p>223</p></strong>
            </td>
            <td>
                <p>Primes d'assurances A completer si assurance << en directe >></p>
            </td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>{{formatedLineTotals.223}}</p>
            </td>
        </tr>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <strong><p>224</p></strong>
            </td>
            <td>
                <p>Dépenses de réparation, d'entretien et d'amélioration (remplir également la rubrique 400)</p>
            </td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>{{formatedLineTotals.224}}</p>
            </td>
        </tr>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <strong><p>225</p></strong>
            </td>
            <td>
                <p>Charges récupérables non réupérées au départ du locataire</p>
            </td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>{{formatedLineTotals.225}}</p>
            </td>
        </tr>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <strong>226</strong>
            </td>
            <td>
                <p>Indemnités d'éviction, frais de relogement</p><br>
            </td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>{{formatedLineTotals.226}}</p>
            </td>
        </tr>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <strong>227</strong>
            </td>
            <td>
                <p>Taxes foncières, taxes annexes de {{year}}</p>
                <p>(Taxe d'enlevement des ordures ménagères : voir notice)</p>
                <p><strong>Régimes particuliers</strong></p>
            </td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>{{formatedLineTotals.227}}</p>
            </td>
        </tr>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <strong><p>228</p></strong>
            </td>
            <td>
                <p>Déduction spécifique (sous certaines conditions : voir notice)</p>
                <p>0 % du total de la ligne 215</p>
                <p><strong>Immeubles en copropriété</strong> (uniquement pour les propriétaires bailleurs)</p>
            </td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>{{formatedLineTotals.228}}</p>
            </td>
        </tr>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <strong><p>229</p></strong>
            </td>
            <td>
                <p>Provisions pour charges payées en {{date}}</p>
            </td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>{{formatedLineTotals.229}}</p>
            </td>
        </tr>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <strong><p>230</p></strong>
            </td>
            <td>
                <p>Régularisation des provisions pour charges déduites en {{previousYear}}</p>
            </td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>A RENSEIGNER{{formatedLineTotals.230}}</p>
            </td>
        </tr>
        <br>
        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <div><strong><p>240</p></strong></div>
            </td>
            <td>
                <p><strong>Total des frais et charges : lignes 221 à 229 - ligne 230 </strong> </p>
            </td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>A CALCULER{{formatedLineTotals.240}}</p>
            </td>
        </tr>
        <br>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <div><strong><p>250</p></strong></div>
            </td>
            <td>
                <p><strong>Intérêts d'emprunts</strong> </p>
            </td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>{{formatedLineTotals.250}}</p>
            </td>
        </tr>
        <br>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <div><strong><p>260</p></strong></div>
            </td>
            <td>
                <p><strong>Revenus fonciers taxables</strong> </p>
            </td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>A RENSEIGNER{{formatedLineTotals.260}}</p>
            </td>
        </tr>

        <tr >
            <td style="justify-content: flex-end; border-bottom: 0px; border-left: 1px solid black">
                <div><strong><p>261</p></strong></div>
            </td>
            <td>
                <p>Ligne 215 - ligne 240 - ligne 250</p>
            </td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>A CALCULER{{formatedLineTotals.261}}</p>
            </td>
        </tr>

        <tr >
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <div><strong><p>262</p></strong></div>
            </td>
            <td>
                <p>Réintégration du supplément de déduction (voir notice)</p>
            </td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>{{formatedLineTotals.262}}</p>
            </td>
        </tr>

        <tr style="border-bottom: 1px solid black">
            <td style="border-bottom: 0px; border-left: 1px solid black">
                <div><strong><p>263</p></strong></div>
            </td>
            <td>
                <p><strong>Bénefice (+) ou déficit (-): lignes 261 + ligne 262</strong> </p>
            </td>
            <td colspan="2" style="justify-content: flex-end; border-left: 1px solid black; border-right: 1px solid black">
                <p>{{formatedLineTotals.263}}</p>
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
