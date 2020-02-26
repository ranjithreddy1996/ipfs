const express = require('express');
const bodyParser = require('body-parser');
const Nexmo = require('nexmo');
const cors = require("cors");

// Init app
const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// Init Nexmo
const nexmo = new Nexmo({
  apiKey: '57c9976c',
  apiSecret: 'D8R1kZ3VYyLG9Jqj'
}, { debug: true });

// Public folder setup
app.use(express.static(__dirname + '/public'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index route
app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

// Catch form submit
app.post('/sendsms', (req, res) => {
  const number = req.body.number;
  let pass = {ID: req.body.id,
  password: req.body.pass}

  var pass1 = JSON.stringify(pass)
  console.log(pass1);
  console.log("res from front:", req.body);
  
  nexmo.message.sendSms(
    '+91 7386073211', number, pass1, { type: 'unicode' },
    (err, responseData) => {
      if(err) {
        console.log(err);
      } else {
        console.dir(responseData);
      }
    }
  );
});

// Define port
const port = 4000;

// Start server
const server = app.listen(port, () => console.log(`Server started on port ${port}`));