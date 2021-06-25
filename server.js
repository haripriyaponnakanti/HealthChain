var fs = require('fs-extra');
var http = require('http');
var https = require('https');
const connectionParameters = require("./app/connection");
var express = require('express');
var app = express();


var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var server2 = require('http').createServer(app);


var flash = require('connect-flash');
var validator = require('express-validator');
var exphbs = require('express-handlebars');
var hbs = exphbs.create({
    helpers: {
   iff: function (a, b, options) {
    if (a == b) { return options.fn(this); }
    return options.inverse(this); },
    },
	extname: '.hbs', 
	defaultLayout: 'layout', 
	layoutsDir: __dirname + '/public/views/layouts/', 
	partialsDir: __dirname + '/public/views/partials/' 
});
var router = express.Router();

var session = require('express-session');
var mysql = require('mysql');

var mysqlPool = mysql.createPool({
    host: connectionParameters[0].host,
    user: connectionParameters[0].user, 
    password: connectionParameters[0].password,
    database: 'infosec',
    connectionLimit: 400
});



// view engine setup
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'public'));
expressValidator = require('express-validator');

var fs = require('fs');

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({limit: '10mb', extended: true})); // parse application/x-www-form-urlencoded
app.use(validator());


app.get("/", (req, res) => {					
			//res.render('index')
class HealthBlock {
  constructor(index, timestamp, data, precedingHash = " ") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.precedingHash = precedingHash;
    this.hash = this.computeHash();
    this.nonce = 0;
  }

  computeHash() {
    return SHA256(
      this.index +
        this.precedingHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  proofOfWork(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.computeHash();
    }
  }
}

class HealthBlockchain {
  constructor() {
    this.blockchain = [this.startGenesisBlock()];
    this.difficulty = 4;
  }
  startGenesisBlock() {
    return new HealthBlock(0, "01/01/2020", "Initial Block in the Chain", "0");
  }

  obtainLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }
  addNewBlock(newBlock) {
    newBlock.precedingHash = this.obtainLatestBlock().hash;
    //newBlock.hash = newBlock.computeHash();
    newBlock.proofOfWork(this.difficulty);
    this.blockchain.push(newBlock);
  }

  checkChainValidity() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const precedingBlock = this.blockchain[i - 1];

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }
      if (currentBlock.precedingHash !== precedingBlock.hash) return false;
    }
    return true;
  }
}

let HealthRecord = new HealthBlockchain();


//res.json("in progress....");
HealthRecord.addNewBlock(
  new HealthBlock(1, "01/06/2020", {
	   name: "patientDetails",
	   policy: "OR ('HealthCareOrg1.member',   'HealthCareOrg2.member','HealthCareOrg3.member')",
       requiredPeerCount: 0,
       maxPeerCount: 3,
       blockToLive:1000000,
       memberOnlyRead: true
  })
);

HealthRecord.addNewBlock(
  new HealthBlock(2, "01/07/2020", {
	   name: "patientBillingDetails",
       policy: "OR ('HealthCareOrg1.member','HealthCareOrg2.member')",
       requiredPeerCount: 0,
       maxPeerCount: 3,
       blockToLive:1000000,
       memberOnlyRead: true
  })
);

res.json(JSON.stringify(HealthRecord, null, 4));			
			
			
			
});


const SHA256 = require("crypto-js/sha256");


app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

require('./app/routes')(app); // pass our application into our routes
require("express-stream-json");

server2.listen(3000)
console.log('server started'); 			// shoutout to the user
exports = module.exports = app; 						// expose app
