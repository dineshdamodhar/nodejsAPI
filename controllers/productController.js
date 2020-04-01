const express = require('express');
var router = express.Router();
var request = require("request");
var ObjectId = require('mongoose').Types.ObjectId;

var {
	Category
} = require('../models/category');
var {
	Product
} = require('../models/product')
// cuud operation for category api
router.get('/categories', (req, res) => {
	Category.find((err, docs) => {
		if (!err) {
			res.send(docs);
			let cate = [];
			for (let i = 0; i < docs.length; i++) {
				cate.push(docs[i]._doc.category);
			}
			//array contains list of categories
			console.log( cate)
			request("http://localhost:3000/products", function (error, response, body) {
				let data = JSON.parse(body)
				for (let j = 0; j < cate.length; j++) {
					var count = data.reduce(function (n, datum) {
						return n + (datum.category === cate[j]);
					}, 0);
					//printing categories along with the count
					console.log(cate[j], count)
				}
			});


		} else {
			console.log('Error in Retriving Categories :' + JSON.stringify(err, undefined, 2));
		}
	});
});

router.get('/categories/:id', (req, res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send(`No record with given id : ${req.params.id}`);

	Category.findById(req.params.id, (err, doc) => {
		if (!err) {
			res.send(doc);
		} else {
			console.log('Error in Retriving Category :' + JSON.stringify(err, undefined, 2));
		}
	});
});

router.post('/categories', (req, res) => {
	var cat = new Category({
		category: req.body.category,
	});
	cat.save((err, doc) => {
		if (!err) {
			res.send(doc);
		} else {
			console.log('Error in Category Save :' + JSON.stringify(err, undefined, 2));
		}
	});
});

router.delete('/categories/:id', (req, res) => {
	console.log(req.params.id)
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send(`No record with given id : ${req.params.id}`);
	var id = req.params.id;
	console.log("coming")
	Category.findByIdAndRemove(req.params.id, (err, doc) => {
		if (!err) {
			res.send(doc);
		} else {
			console.log('Error in Category Delete :' + JSON.stringify(err, undefined, 2));
		}
	});
});


//Crud operation for products api


router.get('/products', (req, res) => {
	Product.find((err, docs) => {
		if (!err) {
			res.send(docs)
		} else {
			console.log('Error in Retriving Products :' + JSON.stringify(err, undefined, 2));
		}
	});
});

router.get('/products/:id', (req, res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send(`No record with given id : ${req.params.id}`);

	Product.findById(req.params.id, (err, doc) => {
		if (!err) {
			res.send(doc);
		} else {
			console.log('Error in Retriving Products :' + JSON.stringify(err, undefined, 2));
		}
	});
});

router.post('/products', (req, res) => {
	var prod = new Product({
		productName: req.body.productName,
		category: req.body.category,
	});
	prod.save((err, doc) => {
		if (!err) {
			res.send(doc);
		} else {
			console.log('Error in Category Save :' + JSON.stringify(err, undefined, 2));
		}
	});
});

router.delete('/products/:id', (req, res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send(`No record with given id : ${req.params.id}`);

	Product.findByIdAndRemove(req.params.id, (err, doc) => {
		if (!err) {
			res.send(doc);
		} else {
			console.log('Error in Category Delete :' + JSON.stringify(err, undefined, 2));
		}
	});
});

module.exports = router;