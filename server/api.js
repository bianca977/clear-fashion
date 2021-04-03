const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db= require('./db');

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
app.get('/products', async (req, res) => {
  //response.send({'a': true});
  let page = parseInt(req.query.page);
  let size = parseInt(req.query.size);
  let start = (size*(page-1));
  console.log("start= "+start);
  console.log("end=" +start + size);
  let prod = []
  let counter = 0;
  const result = await db.find({"price":{$ne:Number("Nan")}})

  for(i=start;i<start+size;i++){
      if(result[i] != null){
        console.log(i+' '+result[i].price)
        prod.push(result[i])
        counter++;

      }

    }
  console.log(counter);
  res.send({"success":true,"data":{"result":prod,"meta":{"currentPage":page,"pageCount":Math.round(result.length/size),"pageSize":size,"count":result.length}}});
});

app.get('/products/search', async (req, res) => {
  let limit = 12
  if(req.query.limit){
    limit = req.query.price;
  }
  let prod = []
  const result = await db.find({'brand':req.query.brand,'price':{"$lte": parseFloat(req.query.price)}})
  for(i=0;i<limit;i++){
    prod.push(result[i])
  }
prod.sort(function(a,b){
  {return a.price - b.price}
});
res.send(prod);
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
