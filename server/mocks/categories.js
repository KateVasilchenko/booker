module.exports = function(app) {
  var express = require('express');
  var categoriesRouter = express.Router();

  var categories = [
    {id: 1, name: "Food"},
    {id: 2, name: "Drink"},
    {id: 3, name: "Entertainment"},
    {id: 4, name: "Medicine"},
    {id: 5, name: "Tourism"},
    {id: 6, name: "Fuel"},
    {id: 7, name: "House"},
    {id: 8, name: "Children"},
    {id: 9, name: "Gifts"},
    {id: 10, name: "Games"},
    {id: 11, name: "Clothes"},
  ];

  categoriesRouter.get('/', function(req, res) {
    res.send({
      'categories': categories
    });
  });

  categoriesRouter.post('/', function(req, res) {
    function getRandomId(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }

    var jsonString = '';
    req.on('data', function (data) {
      jsonString += data;
    });
    req.on('end', function () {
      var category = JSON.parse(jsonString);
      category.category.id = getRandomId(1, 100);
      res.end(JSON.stringify(category));
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
