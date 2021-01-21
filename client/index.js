// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}]

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);





/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable


const link='https://www.loom.fr/collections/tous-les-vetements/products/le-t-shirt';
console.log(link);

/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable

const numberProduct=marketplace.length;
console.log(numberProduct);


// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have

const brandsname=[];
marketplace.forEach(function(product){
if(brandsname.includes(product.brand)==false){
	brandsname.push(product.brand);
}
});

console.log(brandsname);
console.log("we have "+brandsname.length+" differents brands.");

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable

let sortedlist=marketplace;

sortedlist.sort(function(a,b){
	return a.price - b.price;
});

console.log(sortedlist);


// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable

let sortedbydate=marketplace;

sortedbydate.sort(function(a,b){
	return new Date(a.date) - new Date(b.date);
});

console.table(sortedbydate);
console.log(sortedbydate);



// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list

let pricerange=[];

marketplace.forEach(function(product){
if(product.price>=50 && product.price<=100){
	pricerange.push(product);
}
})

console.table(pricerange);
console.log(pricerange);

// 🎯 TODO: Average Basket
// 1. Determine the average basket of the marketplace
// 2. Log the average

let averagebasket=0;

marketplace.forEach(function(product){
	averagebasket=averagebasket+product.price;

})

averagebasket=averagebasket/marketplace.length;

console.log("the average basket of the marketplace is "+averagebasket+" euros");



/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands


const keybrand={};

marketplace.forEach(function(product){
	keybrand[product.brand]=marketplace.filter(k=> k.brand == product.brand);
});

console.log(keybrand);

// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort

for (const [key, value] of Object.entries(keybrand)){
	value.sort(function(a,b){
		if(a.price>b.price)
			return -1;
		if(a.price<b.price)
			return 1;
		return 0;
	});
};

console.log("for each brand the products are sorted by price");
console.log(keybrand);




// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort

for (const [key, value] of Object.entries(keybrand)){
	value.sort(function(a,b){
		if(new Date(a.date)>new Date(b.date))
			return 1;
		if(new Date(a.date)<new Date(b.date))
			return -1;
		return 0;
	});
};

console.log("for each brand the products are sorted by date");
console.log(keybrand);


/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products

//For each brand, sort the products by price, from lowest to highest

for (const [key, value] of Object.entries(keybrand)){
	value.sort(function(a,b){
		if(a.price>b.price)
			return 1;
		if(a.price<b.price)
			return -1;
		return 0;
	});
};

//console.log(keybrand);


//now we look fir the value of the 90th percentile
let rankpercentile=0;
let p90val=0;


for (const [key, value] of Object.entries(keybrand)){
	rankpercentile=Math.round(0.90*value.length);
	p90val=value[rankpercentile];
	p90val=p90val.price;


	console.log("the p90 price value for the brand "+ key+" is "+p90val);

	
};



/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.

var twoweeksbefore = new Date();

var jour= twoweeksbefore.getDate();
twoweeksbefore=twoweeksbefore.setDate(jour-14);
twoweeksbefore=new Date(twoweeksbefore);

console.log("the date two weeks ago was "+twoweeksbefore);


COTELE_PARIS.forEach(function(product){
	if (new Date(product.released)> twoweeksbefore)
		console.log(product.name + " is a new product");
	

})


// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€


let priceok=0;

COTELE_PARIS.forEach(function(product){
	if (product.price< 100)
		priceok=priceok+1;
	
})
if (priceok==COTELE_PARIS.length)
	console.log("Cotele Paris is a reasonable shop");
else
	console.log("Cotele Paris is not a reasonable shop because some article costs more than 100");


// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product

console.log("the following product has the uuid =`b56c6d88-749a-5b4c-b571-e5b5c6483131' ");
 

COTELE_PARIS.forEach(function(product){
	if (product.uuid== `b56c6d88-749a-5b4c-b571-e5b5c6483131`)
		console.log(product);	
})



// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product

let pos=0;


console.table(COTELE_PARIS);


for(let i=0;i<COTELE_PARIS.length;i++){
  if(COTELE_PARIS[i].uuid==`b56c6d88-749a-5b4c-b571-e5b5c6483131`){
    pos=i;
  }
}


COTELE_PARIS.splice(pos,1);
console.log("the new list of product is : ");
console.table(COTELE_PARIS);




// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;
jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables

console.log(blueJacket);
console.log(jacket);

// 2. What do you notice?

// the property 'favorite' has also been had to the blueJacket variable 



blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties

jacket={
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa',
  'favorite':true
};

console.log(blueJacket);
console.log(jacket);



/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage
localStorage.clear();

MY_FAVORITE_BRANDS.forEach(function(product){
  localStorage.setItem(product.name,product.url);
});

console.log(localStorage);
