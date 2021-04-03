/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const loom=require('./sources/loom');
const mudjeans=require('./sources/mudjeans');

const db=require('./db');
const eshop=['https://www.dedicatedbrand.com','https://mudjeans.eu/','https://www.loom.fr/collections/tous-les-vetements'];

async function sandbox () {
  try {
    

    const products_dedicated = await dedicatedbrand_scrape(eshop[0]);
    const products_mudjeans = await mudjeans_scrape(eshop[1]);
    const products_loom = await loom_scrape(eshop[2]);

    let products=[]
    products=products_dedicated.concat(products_mudjeans,products_loom);

    console.log(`👕 ${products.length} total of products found`);

    console.log('\n');

    const result = await db.insert(products);

    console.log(`💽  ${result.insertedCount} inserted products`);

    console.log('\n');

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
	}
}

async function dedicatedbrand_scrape(eshop, brand = 'DEDICATED'){
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);  


    let products_dedicated = await dedicatedbrand.scrape_products(eshop);
    let products = [];
    

    //Scrapping all menu links on home page
    const links = await dedicatedbrand.scrape_links(eshop);
    
    //Scrapping on all the links
    for(let i = 0; i < links.length; i++){
      actual_link = eshop + links[i];
      console.log(actual_link);
      products = await dedicatedbrand.scrape_products(actual_link);
      products_dedicated = products_dedicated.concat(products)
    }

    products_dedicated = removeDuplicate(products_dedicated, 'name')
    products_dedicated = products_dedicated.filter(item => (item.price > 0));
    console.log('Dedicated scrapping done');
    return products_dedicated;
  } catch (e) {
    console.error(e);
    process.exit(1);
  }  
}

async function mudjeans_scrape(eshop, brand = 'MUDJEANS'){
  try  {
    

    //Scrapping home page
    console.log(eshop);
    let products_mudjeans= await mudjeans.scrape_products(eshop);
    let products = [];  
    

    //Scrapping all menu links on home page
    let links_duplicated = await mudjeans.scrape_links(eshop);
    let links = [];

    //Removing duplicates links
    links_duplicated.forEach((link) => {
      if(!links.includes(link)){
        links.push(link);
      }
    })

    //Scrapping on all the links
    for(let i = 0; i < links.length; i++){
      actual_link = eshop + links[i];
      console.log(actual_link);
      products = await mudjeans.scrape_products(actual_link);
      products_mudjeans = products_mudjeans.concat(products);
      //toJsonFile.productToJsonFile(products, brand);
    }

    products_mudjeans = removeDuplicate(products_mudjeans, 'name')
    products_mudjeans = products_mudjeans.filter(item => (item.price > 0));
    console.log('Mudjeans scrapping done');
    return products_mudjeans;
  } catch (e) {
    console.error(e);
    process.exit(1);
  }  
}

async function loom_scrape(eshop, brand = 'LOOM'){
  try  {
    

    //Scrapping home page
    console.log(eshop);
    let products_loom= await loom.scrape(eshop);
 
    

    products_loom = removeDuplicate(products_loom, 'name')
    products_loom = products_loom.filter(item => (item.price > 0));
    console.log('Loom scrapping done');
    return products_loom;
  } catch (e) {
    console.error(e);
    process.exit(1);
  }  
}

function removeDuplicate(array, key) {
  var check = new Set();
  return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
}


sandbox(eshop);





