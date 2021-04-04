// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let reasonable_checkbox='off';
let recent_checkbox='off';


// inititiqte selectors
const selectShow = document.querySelector('#show-select'); //selectionne la ligne correspodant a show-selct du html
const selectPage = document.querySelector('#page-select');
const selectBrand= document.querySelector('#brand-select');
const selectSort=document.querySelector('#sort-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const p50=document.querySelector('#p50');
const p90=document.querySelector('#p90');
const p95=document.querySelector('#p95');

const ReasonablePrice=document.querySelector("#reasonable-price");
//const RecentReleased=document.querySelector('#recently-released');
const Favoritess=document.querySelector('#favorites'); 



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
      `https://clear-fashion-server-six.vercel.app/products?page=${page}&size=${size}`
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
        <span1>${product.brand}</span1>
        <a href="${product.link}">${product.name}</a>
        <span1>${product.price}</span1>
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




/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => { //nombre de produit affiché en fonction du nre de produit à afficher 
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
  p50.innerHTML=percentile(50)+ " euros";
  p90.innerHTML=percentile(90)+ " euros";
  p95.innerHTML=percentile(95)+ " euros";
  if(reasonable_checkbox==='on'){
    sortAffordable(products);
  }

};

function percentile(p){
  var prod=currentProducts.sort((a,b)=>compare_price_asc(a,b));
  var i=Math.floor((p/100)*prod.length)
  return prod[i].price
};

const render = (products, pagination) => {
 
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  const brand=ListBrands(currentProducts);
  renderBrands(brand);
  checkboxes(products);
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

function checkboxes(products){
  if(reasonable_checkbox==='on'){
    sortAffordable(products);
  }
  else if(recent_checkbox==='on'){
    sortNewReleased(products);
  }
}


// function to select the way we want to sort the products before showing them to thz client 
function Selection(currentProducts,selectedSorting){

  if (selectedSorting == 'price-asc'){
    sortByPriceAsc(currentProducts);
  }
  else if (selectedSorting == 'price-desc'){
    sortByPriceDesc(currentProducts);
  }
  else if (selectedSorting == 'date-desc'){
    sortByDateDesc(currentProducts);
  }
  else {
    sortByDateAsc(currentProducts);
  }
}

//Function to make the comparation, they are going to be used into function for sorting
function compare_date_asc(a,b){
  if (a.released < b.released){
    return 1;
  }
  else if (a.released > b.released) {
    return -1;
  }
  else {
    return 0;
  }
}

function compare_date_desc(a,b){
  if (a.released>b.released){
    return 1;
  }
  else if (a.released<b.released){
    retunr -1;
  }
  else {
    return 0;
  }
}

function compare_price_asc(a,b){
  if (a.price < b.price){
    return -1;
  }
  else if (a.price > b.price){
    return 1;
  }
  else {
    return 0;
  }
}

function compare_price_desc(a,b){
  if (a.price > b.price){
    return -1;
  }
  else if (a.price < b.price){
    return 1;
  }
  else {
    return 0;
  } 
}

function is_newly_released(product){
  var todayDate=new Date();
  var productDate= new Date(product.released);
  //we check if the product has been released less than 21 days ago
  if (todayDate - productDate < 86400*21000){
    return true;
  }
  else {
    return false;
  }
}


//Function to sort the products
function sortByDateAsc(currentProducts){
  let sortedproducts = currentProducts.sort(compare_date_asc);
  sortbrand(sortedproducts,selectBrand.value);
}

function sortByDateDesc(currentProducts){
  let sortedproducts = currentProducts.sort(compare_date_desc);
  sortbrand(sortedproducts,selectBrand.value);
}

function sortByPriceAsc(currentProducts){
  let sortedproducts = currentProducts.sort(compare_price_asc);
  sortbrand(sortedproducts,selectBrand.value);
}

function sortByPriceDesc(currentProducts){
  let sortedproducts = currentProducts.sort(compare_price_desc);
  sortbrand(sortedproducts,selectBrand.value);
}

function sortAffordable(currentProducts){
  let affordableProducts=[];
  for (let i=0; i<currentProducts.length;i++){
    if (currentProducts[i].price<50){
      affordableProducts.push(currentProducts[i]);
    }
  }
  sortbrand(affordableProducts,selectBrand.value);
}

function sortNewReleased(currentProducts){
  let newReleasedProducts=[];
  for (let i=0; i<currentProducts.length; i++){
    if (is_newly_released(currentProducts[i])==true){
      newReleasedProducts.push(currentProducts[i]);
    }
  }
  sortbrand(newReleasedProducts,selectBrand.value);

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
  Selection(currentProducts,selectSort.value);
});

//feature 3

selectSort.addEventListener('change',event => {
  Selection(currentProducts,event.target.value);
  
});

ReasonablePrice.addEventListener('change',()=>{
  if(reasonable_checkbox=='on'){
    reasonable_checkbox='off';
  }else{
    reasonable_checkbox='on';
  }
  render(currentProducts,currentPagination);
  
})





document.addEventListener('DOMContentLoaded',()=>
  fetchProducts().then(setCurrentProducts).then(()=>render(currentProducts,currentPagination))
);