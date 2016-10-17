module.exports = function(app) {
  var express = require('express');
  var categoriesRouter = express.Router();

  var categories = [
    {id: 1, name: "Main", icon: 3},
    {id: 2, name: "Another", icon: 5}
  ];

  categoriesRouter.get('/', function(req, res) {
    res.send({
      'categories': categories
    });
  });

  categoriesRouter.post('/', function(req, res) {
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
      var category = JSON.parse(jsonString); //Читаем обьект jsonString из строки формата JSON и работаем с ним.
      category.category.id = getRandomId(1, 100);
      console.log(category);
      responseData = JSON.stringify(category); //Для передачи данных из JS по сети используем метод stringify(). Преобразуем обьект в строку формата JSON.
      res.end(responseData);
      res.status(201).end();
    });
  });

  categoriesRouter.get('/:id', function(req, res) {
    var foundCategory = null;
    categories.forEach(function(category) {
      if (req.params.id == category.id) {
        foundCategory = category;
      }
    });

    res.send({
      'category': foundCategory
    });
  });

  categoriesRouter.put('/:id', function(req, res) {
    var jsonString = '';
    req.on('data', function (data) {
      jsonString += data;
    });
    req.on('end', function () {
      var category = JSON.parse(jsonString);
      res.status(204).end();
    });
  });

  categoriesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/categories', categoriesRouter);
};
