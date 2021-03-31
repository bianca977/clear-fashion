// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// inititiqte selectors
const selectShow = document.querySelector('#show-select'); //selectionne la ligne correspodant a show-selct du html
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand= document.querySelector('#brand-select');
const selectSort=document.querySelector('#sort-select'); //select the button sort part 
/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {//recupere les produits 
  try {
    const response = await fetch(
      `https://clear-fashion2.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => { //rend la liste des produits
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template; //ajoute a la suite du html div
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
/* const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
}; */

//feature 1
function renderPagination (pagination) { //ajoute les pages de 1 à 12 dans le selector go to page
  const nbPage=pagination.pageCount; //nombre de page donné par la variable pagination
  const currentPage=pagination.currentPage;
  let options='';

  for(var index=0; index<nbPage; index ++) {
    options += '<option value="'+ (index+1) + '">' + (index+1) + '</option>';
  }
  

  selectPage.innerHTML=options; //ajout a l'interieur du selectPage du html 
  selectPage.selectedIndex=currentPage-1;
}


//feature 2
function ListBrands(products) {
  let brandsname= [];
  for (var i=0;i<products.length;i++){
    if(brandsname.includes(products[i]["brand"])==false){
      brandsname.push(products[i]["brand"])
    }
  }
  return brandsname;
}


function renderBrands(brand) {
  let options='';

  for (var i=0;i<brand.length;i++){
    options+='<option value="'+ (brand[i]) + '">' + (brand[i]) + '</option>'
  }

  selectBrand.innerHTML=options;

}

//feature 3
function RecentReleased(products){
	let recentproducts=[];
	var twoweeksago= new Date();
	twoweeksago=twoweeksago.setDate((twoweeksago.getDate())-14);
	twoweeksago=new Date(twoweeksago);

	

	for (var i=0; i<products.length;i++){
		if(new Date(products[i]["date"])>twoweeksago){
			recentproducts.push(products[i]);
		}
	}
	renderProducts (recentproducts);
}



/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => { //nombre de produit affiché en fonction du nre de produit à afficher 
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  const brand=ListBrands(currentProducts);
  renderBrands(brand);
};

function sortbrand(products,brand){
  const sortedproduct=[];
  for(var i=0; i<products.length;i++){
    if(products[i]["brand"]==brand){
      sortedproduct.push(products[i]);
    }
  }
  renderProducts(sortedproduct);
}

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => { //according to the selector show choosen
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

selectPage.addEventListener('change', event => { //according to the selector show choosen
  fetchProducts(parseInt(event.target.value), currentProducts.length)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

//feature 2

selectBrand.addEventListener('change',event=>{
  sortbrand(currentProducts,event.target.value)
});

//feature 3

selectSort.addEventListener('change',event => {

	if (event.target.value=='date-asc'){
		RecentReleased(currentProducts);

	}
})

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);
