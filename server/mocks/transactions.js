module.exports = function(app) {
  var express = require('express');
  var transactionsRouter = express.Router();

  var transactions = [
    {id: 1, description: "Buy ball", amount: 300, is_negative: false, links: { "category": "/api/categories/1",  "wallet": "/api/wallets/1" }},
    {id: 2, description: "Buy pen", amount: 20, is_negative: false, links: { "category": "/api/categories/2",  "wallet": "/api/wallets/2" }}
  ];


  transactionsRouter.get('/', function(req, res) {
    res.send({
      'transactions': transactions
    });
  });

  transactionsRouter.post('/', function(req, res) {
    function getRandomId(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }
    var jsonString = '';
    req.on('data', function (data) {
      jsonString += data;
    });
    req.on('end', function () {
      var transaction = JSON.parse(jsonString);
      transaction.transaction.id = getRandomId(1, 100);
      res.end(JSON.stringify(transaction));
      res.status(201).end();
    });
  });

  transactionsRouter.get('/:id', function(req, res) {
    res.send({
      'transactions': {
        id: req.params.id
      }
    });
  });

  transactionsRouter.put('/:id', function(req, res) {
    var jsonString = '';
    req.on('data', function (data) {
      jsonString += data;
    });
    req.on('end', function () {
      var transaction = JSON.parse(jsonString);
      res.status(204).end();
    });
  });

  transactionsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/transactions', transactionsRouter);
};
