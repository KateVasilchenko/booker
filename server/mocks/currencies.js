module.exports = function(app) {
  var express = require('express');
  var currenciesRouter = express.Router();

  var currencies = [
    {id: 1, name: "Russian Ruble", icon: "http://allIconForCurrencies.com"},
    {id: 2, name: "US Dollar", icon: "http://allIconForCurrencies.com"}
  ];

  currenciesRouter.get('/', function(req, res) {
    res.send({
      'currencies': currencies
    });
  });

  currenciesRouter.post('/', function(req, res) {
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
      var currency = JSON.parse(jsonString); //Читаем обьект jsonString из строки формата JSON и работаем с ним.
      currency.currency.id = getRandomId(1, 100);
      console.log(currency);
      responseData = JSON.stringify(currency); //Для передачи данных из JS по сети используем метод stringify(). Преобразуем обьект в строку формата JSON.
      res.end(responseData);
      res.status(201).end();
    });
  });

  currenciesRouter.get('/:id', function(req, res) {
    res.send({
      'currencies': {
        id: req.params.id
      }
    });
  });

  currenciesRouter.put('/:id', function(req, res) {
    var jsonString = '';
    req.on('data', function (data) {
      jsonString += data;
    });
    req.on('end', function () {
      var currency = JSON.parse(jsonString);
      res.status(204).end();
    });
  });

  currenciesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/currencies', currenciesRouter);
};
