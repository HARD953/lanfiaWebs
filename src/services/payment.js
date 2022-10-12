import { cinet_pay } from "../api/cinet_pay_config";

export const CinetPay = window.CinetPay

export function makePayment(amount,customerName,customerSurname) {
    CinetPay.setConfig({
        apikey: cinet_pay.API_KEY,
        site_id: cinet_pay.SITE_ID,
        notify_url: cinet_pay.NOTIFY_URL,
        mode: 'PRODUCTION'
    });
    CinetPay.getCheckout({
        transaction_id: Math.floor(Math.random() * 100000000).toString(), // YOUR TRANSACTION ID
        amount: amount,
        currency: 'XOF',
        channels: 'ALL',
        description: 'Don en argents',   
         //Fournir ces variables pour le paiements par carte bancaire
        customer_name: customerName,//Le nom du client
        customer_surname: customerSurname,//Le prenom du client
        customer_email: "down@test.com",//l'email du client
        customer_phone_number: "088767611",//l'email du client
        customer_address : "BP 0024",//addresse du client
        customer_city: "Antananarivo",// La ville du client
        customer_country : "CM",// le code ISO du paysn
        customer_state : "CM",// le code ISO l'état
        customer_zip_code : "06510", // code postal

    });
    // CinetPay.waitResponse(function(data) {
    //     if (data.status === "REFUSED") {
    //         if (alert("Votre paiement a échoué")) {
    //             window.location.reload(); 
    //         }
    //     } else if (data.status === "ACCEPTED") {
    //         if (alert("Votre paiement a été effectué avec succès")) {
    //             window.location.reload();
    //         }
    //     }
    // });
    // CinetPay.onError(function(data) {
    //     console.log(data);
    // });
}

export const makePaymentRedirection = (amount,customerName,customerSurname)=>{
    return {
        apikey: cinet_pay.API_KEY,
        site_id: cinet_pay.SITE_ID,
        transaction_id:  Math.floor(Math.random() * 100000000).toString(), //
        currency: "XOF",
        amount: amount,
        alternative_currency: "",
        description: " TEST INTEGRATION ",
        customer_id: "172",
        customer_name: customerName,
        customer_surname: customerSurname,
        customer_email: "harrissylver@gmail.com",
        customer_phone_number: "+225004315545",
        customer_address: "Antananarivo",
        customer_city: "Antananarivo",
        customer_country: "CM",
        customer_state: "CM",
        customer_zip_code: "065100",
        notify_url: cinet_pay.NOTIFY_URL,
        return_url: cinet_pay.NOTIFY_URL,
        channels: "ALL",
        metadata: "user1",
        lang: "FR",
        invoice_data: {
          Donnee1: "",
          Donnee2: "",
          Donnee3: ""
        }
      }
}