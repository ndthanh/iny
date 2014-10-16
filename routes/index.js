/**
 * wishes route
 *
 * @module		:: Routes
 * @description :: Maps routes and actions
 *  
 */

 var express = require('express');
 var router = express.Router();
 var wishes = require('../models/wishes.js');
 var RateLimiter = require('limiter').RateLimiter;
 var limiter = new RateLimiter(600000, 'minute', true);
/**
 * Find and retrieves all wishes
 */

 // findAllWishes = function (req, res) {
 // 	console.log("GET - /wishes");
 // 	return wishes.find(function (err, wishes) {
 // 		if(!err){
 // 			return res.send(wishes);
 // 		} else {
 // 			res.statusCode = 500;
 // 			console.log('Internal error(%d): %s', res.statusCode, err.message);
 // 			return res.send({ error: 'Server error'});
 // 		}
 // 	});
 // };

 home = function (req, res) {
 	res.send('ok');	
 };

/**
 * Find and retrieves a single wish by its ID
 */

 findById = function (req, res) {
 	console.log("GET - /wishes/:id");
 	return wishes.findById(req.params.id, function (err, wish) {
 		if(!wish) {
 			res.statusCode = 404; 
 			return res.send({ error: 'Not found'});
 		}

 		if(!err) {
 			console.log(req.params.id);
 			res.render('index',{status: 'OK', wish: wish});
 		} else {
 			res.statusCode = 500; 
 			console.log('Internal error(%d): %s', res.statusCode, err.message);
 			return res.send({ error: 'Not found'});
 		}
 	});
 };

/**
 * Create a new wish from the data request
 */
 addWish = function (req, res) {
 	console.log('POST - /wishes');

 	limiter.removeTokens(1, function(err, remainingRequests) {
 		if (remainingRequests < 0) {
            // res.writeHead(429, {'Content-Type': 'text/plain;charset=UTF-8'});
            // res.end('429 Too Many Requests - your IP is being rate limited');
            console.log('too many req');
            res.send({status: "NOK", error: err});
        }
        else {
        	var wish = new wishes({
        		content: req.body.content,
        		user: req.body.user,
        		background: req.body.background
        	});

        	console.log(wish);

        	wish.save(function (err) {
        		if(err) {
        			console.log('Error while saving wish: ' + err);
        			res.send({ error: err});
        			return;
        		} else {
        			console.log('Wish added');
        			return res.send({status: 'OK', wish:wish});
        		}
        	});
        }
    });
};

// Link routes and actions

router.get('/', home);
router.post('/', addWish);

router.get('/:id', findById);

module.exports = router;