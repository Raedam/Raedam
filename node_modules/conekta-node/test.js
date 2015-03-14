var Conekta = require('./index'),
  conekta = Conekta.init('key_xFq12ins9pZKubYHQmyMWw');

conekta.Customer.getCreditCards(
  'cus_JKhAvJaaY4wpwmHfb',
  function (err, response) {
    console.log('ERR: ', err);

    console.log(response.body);
  }
);
