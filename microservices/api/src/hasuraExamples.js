var express = require('express');
var router = express.Router();
var config = require('./config');
var request = require('request');

//changes for stripe charge task
var dateFormat = require('dateformat');
var fetch = require('node-fetch');
fetch.Promise = require('bluebird');
var bodyParser = require('body-parser');
var stripe = require("stripe")("sk_test_Gd7o2jvQ1Nnf77yfNCA3L1jE");
var datestamp;
var now;
function methodTime(link)
  {
    now = new Date();
    datestamp = dateFormat(now, "dd-mm-yyyy h:MM:ss TT")
    console.log('Get/Post method executed for ' + link + ' page at : '+ datestamp)
  }
//

router.route("/").get(function (req, res) {
  res.send("Hello world from app1")
})

//changes for stripe charge task
router.use(bodyParser.text({ type: 'urlencoded' }))
router.route("/charge").post(function (req, res) 
{
	
	methodTime('/charge');
	console.log('ORIGINAL BODY : ',req.body);
	var obj = JSON.parse(req.body);
	console.log('OBJ.id : ',obj.id);
	console.log('OBJ.email: ',obj.email);

//override this amount with the amount being passed from checkout
    let amount = 1500;
//create customer
	stripe.customers.create({
	email: obj.email,
	source: obj.id
	}).then(customer =>
	{ console.log('customer creatred with id: ', customer.id);
//charge the card
	  stripe.charges.create({
							  amount,
							  description: "Sample Charge",
							  currency: "gbp",
							  customer: customer.id
						   })
	}).then(charge => {console.log("Credit card charged successfuly");
					   res.status(200).send('OK')
					  });
}
)

//End of stripe charge

router.route("/get_articles").get(function (req, res) {
  //Fetch all rows from table - articles
  var selectOptions = {
    url: config.projectConfig.url.data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-User-Id': 0,
      'X-Hasura-Role': 'anonymous'
    },
    body: JSON.stringify({
      'type': 'select',
      'args': {
        'table': 'article',
        'columns': [
          '*'
        ]
      }
    })
  }
  request(selectOptions, function(error, response, body) {
    if (error) {
        console.log('Error from select request: ');
        console.log(error)
        res.status(500).json({
          'error': error,
          'message': 'Select request failed'
        });
    }
    res.json(JSON.parse(body))
  })
})

module.exports = router;
