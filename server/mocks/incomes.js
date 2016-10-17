module.exports = function(app) {
  var express = require('express');
  var incomesRouter = express.Router();

  var incomes = [
    {id: 1, name: "Advance", amount: 545, "links": { "category": "/api/categories/1",  "wallet": "/api/wallets/1" }},
    {id: 2, name: "Award", amount: 220, "links": { "category": "/api/categories/2",  "wallet": "/api/wallets/2" }}
  ];


  incomesRouter.get('/', function(req, res) {
    res.send({
      'incomes': incomes
    });
  });

  incomesRouter.post('/', function(req, res) {
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
      var income = JSON.parse(jsonString); //Читаем обьект jsonString из строки формата JSON и работаем с ним.
      income.income.id = getRandomId(1, 100);
      console.log(income);
      responseData = JSON.stringify(income); //Для передачи данных из JS по сети используем метод stringify(). Преобразуем обьект в строку формата JSON.
      res.end(responseData);
      res.status(201).end();
    });
  });

  incomesRouter.get('/:id', function(req, res) {
    res.send({
      'incomes': {
        id: req.params.id
      }
    });
  });

  incomesRouter.put('/:id', function(req, res) {
    var jsonString = '';
    req.on('data', function (data) {
      jsonString += data;
    });
    req.on('end', function () {
      var income = JSON.parse(jsonString);
      res.status(204).end();
    });
  });

  incomesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/incomes', incomesRouter);
};
