module.exports = function(app) {
  var express = require('express');
  var outcomesRouter = express.Router();

  var outcomes = [
    {id: 1, name: "Buy ball", amount: 300, "links": { "category": "/api/categories/1",  "wallet": "/api/wallets/1" }},
    {id: 2, name: "Buy pen", amount: 20, "links": { "category": "/api/categories/2",  "wallet": "/api/wallets/2" }}
  ];


  outcomesRouter.get('/', function(req, res) {
    res.send({
      'outcomes': outcomes
    });
  });

  outcomesRouter.post('/', function(req, res) {
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
      var outcome = JSON.parse(jsonString); //Читаем обьект jsonString из строки формата JSON и работаем с ним.
      outcome.outcome.id = getRandomId(1, 100);
      console.log(outcome);
      responseData = JSON.stringify(outcome); //Для передачи данных из JS по сети используем метод stringify(). Преобразуем обьект в строку формата JSON.
      res.end(responseData);
      res.status(201).end();
    });
  });

  outcomesRouter.get('/:id', function(req, res) {
    res.send({
      'outcomes': {
        id: req.params.id
      }
    });
  });

  outcomesRouter.put('/:id', function(req, res) {
    var jsonString = '';
    req.on('data', function (data) {
      jsonString += data;
    });
    req.on('end', function () {
      var outcome = JSON.parse(jsonString);
      res.status(204).end();
    });
  });

  outcomesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/outcomes', outcomesRouter);
};
