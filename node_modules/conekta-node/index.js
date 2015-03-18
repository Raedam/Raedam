var superagent = require('superagent'),
  create_client;

create_client = function (privateKey) {
  var conekta = {};

  conekta.private = privateKey;

  conekta.makeRequest = function (method, endpoint, data, callback){
    method = (method || "").toLowerCase();
    if(['get', 'post', 'put'].indexOf(method) === -1){
      return callback(new Error('Unsupported method'));
    }

    superagent
      [method]('https://api.conekta.io/' + endpoint)
      .auth(conekta.private, '')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/vnd.conekta-v1.0.0+json')
      .send(data)
      .end(callback);
  };

  conekta.Customer = {
    addCard: function(customerId, cardToken, callback){
      conekta.makeRequest('post', 'customers/' + customerId + '/cards/', { token: cardToken }, callback);
    },
    create: function(customer, callback){
      conekta.makeRequest('post', 'customers/', customer, callback);
    },
    getCreditCards: function(customerId, callback){
      conekta.makeRequest('get', '/customers/' + customerId, {}, callback);
    },
    setCardAsActive: function(customerId, cardId, callback){
      conekta.makeRequest('put',  customerId , { default_card_id: cardId }, callback);
    }
  };

  conekta.Charge = {
    create: function(charge, callback){
      conekta.makeRequest('post', '/charges', charge, callback);
    }
  };

  return conekta;
};

module.exports = {
  init: create_client
};
