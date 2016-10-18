module.exports = function(app) {
  var express = require('express');
  var transactionsRouter = express.Router();

  var transactions = [
    {id: 1, description: "Groceries", amount: 100.95, is_negative: false, links: { "category": "/api/categories/1",  "wallet": "/api/wallets/1" }},
    {id: 2, description: "Gasoline", amount: 120.30, is_negative: false, links: { "category": "/api/categories/6",  "wallet": "/api/wallets/2" }},
    {id: 3, description: "Beer", amount: 5.00, is_negative: false, links: { "category": "/api/categories/2",  "wallet": "/api/wallets/1" }},
    {id: 4, description: "Witcher 3", amount: 35.35, is_negative: false, links: { "category": "/api/categories/2",  "wallet": "/api/wallets/2" }},
    {id: 5, description: "Son's birthday gift", amount: 80.99, is_negative: false, links: { "category": "/api/categories/8",  "wallet": "/api/wallets/1" }},
    {id: 6, description: "Bananas", amount: 5.66, is_negative: false, links: { "category": "/api/categories/1",  "wallet": "/api/wallets/2" }},
    {id: 7, description: "Rice", amount: 3.44, is_negative: false, links: { "category": "/api/categories/1",  "wallet": "/api/wallets/1" }},
    {id: 8, description: "Landlord", amount: 1500.00, is_negative: false, links: { "category": "/api/categories/7",  "wallet": "/api/wallets/2" }},
    {id: 9, description: "Basketball tickets", amount: 300.50, is_negative: false, links: { "category": "/api/categories/3",  "wallet": "/api/wallets/1" }},
    {id: 10, description: "Food", amount: 20.46, is_negative: false, links: { "category": "/api/categories/1",  "wallet": "/api/wallets/2" }},
    {id: 11, description: "Gas and tires", amount: 500.33, is_negative: false, links: { "category": "/api/categories/6",  "wallet": "/api/wallets/1" }},
    {id: 12, description: "Gasoline", amount: 120.66, is_negative: false, links: { "category": "/api/categories/6",  "wallet": "/api/wallets/2" }},
    {id: 13, description: "Coca-cola", amount: 3.33, is_negative: false, links: { "category": "/api/categories/2",  "wallet": "/api/wallets/1" }},
    {id: 14, description: "Counter Strike: Global Offensive", amount: 20.00, is_negative: false, links: { "category": "/api/categories/8",  "wallet": "/api/wallets/2" }},
    {id: 15, description: "Son's new sneakers", amount: 100.22, is_negative: false, links: { "category": "/api/categories/8",  "wallet": "/api/wallets/1" }},
    {id: 16, description: "Potatoes", amount: 10.56, is_negative: false, links: { "category": "/api/categories/1",  "wallet": "/api/wallets/2" }},
    {id: 17, description: "Rice", amount: 5.55, is_negative: false, links: { "category": "/api/categories/1",  "wallet": "/api/wallets/1" }},
    {id: 18, description: "Landlord", amount: 1500.00, is_negative: false, links: { "category": "/api/categories/7",  "wallet": "/api/wallets/2" }},
    {id: 19, description: "Taxes", amount: 2231.95, is_negative: false, links: { "category": "/api/categories/7",  "wallet": "/api/wallets/1" }},
    {id: 20, description: "Parking tickets", amount: 40.50, is_negative: false, links: { "category": "/api/categories/3",  "wallet": "/api/wallets/2" }},
    {id: 21, description: "Groceries", amount: 60.56, is_negative: false, links: { "category": "/api/categories/1",  "wallet": "/api/wallets/1" }},
    {id: 22, description: "Gasoline", amount: 110.57, is_negative: false, links: { "category": "/api/categories/6",  "wallet": "/api/wallets/2" }},
    {id: 23, description: "Beer", amount: 10.98, is_negative: false, links: { "category": "/api/categories/2",  "wallet": "/api/wallets/1" }},
    {id: 24, description: "Clothes", amount: 100.99, is_negative: false, links: { "category": "/api/categories/11",  "wallet": "/api/wallets/2" }},
    {id: 25, description: "Wife's anniversary", amount: 300.31, is_negative: false, links: { "category": "/api/categories/9",  "wallet": "/api/wallets/1" }},
    {id: 26, description: "Bananas", amount: 10.41, is_negative: false, links: { "category": "/api/categories/1",  "wallet": "/api/wallets/2" }},
    {id: 27, description: "Rice", amount: 10.69, is_negative: false, links: { "category": "/api/categories/1",  "wallet": "/api/wallets/1" }},
    {id: 28, description: "Landlord", amount: 1500.00, is_negative: false, links: { "category": "/api/categories/7",  "wallet": "/api/wallets/2" }},
    {id: 29, description: "Beer", amount: 10.50, is_negative: false, links: { "category": "/api/categories/2",  "wallet": "/api/wallets/1" }},
    {id: 30, description: "Clothes", amount: 200.50, is_negative: false, links: { "category": "/api/categories/8",  "wallet": "/api/wallets/2" }},
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
