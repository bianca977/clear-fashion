const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db= require('./db/index');

const dbName='clearfashion';

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());




//endpoint pour dire c'est connecté
app.get('/', (request, response) => {
  console.log('/')
  response.send({'ack': true});
});

//endpoint pour ajouter des filtres 
app.get('/products/search', async (request, response) => {

  const limit= (request.params.limit)
  const brand= (request.params.brand)
  const price= (request.params.price)
  let prod=[]
  const product=await db.find({"brand":brand,"price":{"$lte":parseFloat(price)}})

  for (i=0;i<limit;i++){
  	prod.push(product[i])
  }
  response.send(prod);
});

//endpoint pour afficher un produit 
app.get('/products/:id', async (request, response) => {
	console.log('/products/:id')
  const id= (request.params.id)
  const product=await db.find({"_id":id})
  response.send(product);
});




app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);
