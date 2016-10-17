module.exports = function(app) {
  var express = require('express');
  var walletsRouter = express.Router();

  var wallets = [
    {id: 1, name: "Main", balance: 100},
    {id: 2, name: "Another", balance: 200}
  ];

  //Get all wallets
  walletsRouter.get('/', function(req, res) {
    res.send({
      'wallets': wallets
    });
  });

  //Create wallet
  walletsRouter.post('/', function(req, res) {
    function getRandomId(min, max) {
      var random =  Math.random() * (max - min) + min;
      var roundRandom = Math.round(random);
      return roundRandom;
    };
    var jsonString = '';
    req.on('data', function (data) {
      jsonString += data;
    });
    req.on('end', function () {
      var wallet = JSON.parse(jsonString);
      wallet.wallet.id = getRandomId(1, 100);
      console.log(wallet);
      responseData = JSON.stringify(wallet);
      res.end(responseData);
      res.status(201).end();
    });
  });

  //Get specific wallet
  walletsRouter.get('/:id', function(req, res) {
    var foundWallet = null;
    wallets.forEach(function(wallet) {
      if (req.params.id == wallet.id) {
        foundWallet = wallet;
      }
    });

    res.send({
      'wallet': foundWallet
    });
  });

  //Update specific wallet
  walletsRouter.put('/:id', function(req, res) {
    var jsonString = '';
    req.on('data', function (data) {
      jsonString += data;
    });
    req.on('end', function () {
      var wallet = JSON.parse(jsonString);
      res.status(204).end();
    });
  });

  //Delete specific wallet
  walletsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/wallets', walletsRouter);
};
