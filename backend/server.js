// Import
const express = require ('express');
const bodyParser = require ('body-parser')
const apiRouter = require('./apiRouter').router;

//Instantiate server
const server = express();

// Body parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
const cors = require('cors');
const corsOption = {
  origin:'*',
  credential: true,
  optionSuccesStatus: 200,
  exposeHeaders:[
    'Content-Disposition'
  ]
};
server.use(cors(corsOption))


//routes
server.get('/', function (req, res) {
  res.setHeader('Content-Type','text/html')
  res.status(200).send('<h1>Bonjour </h1>')
});

server.use('/api/', apiRouter);

//lunch server
server.listen(process.env.PORT || '3000', function() {
  console.log('serveur en ligne');
})

