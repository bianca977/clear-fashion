const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);
/*
  let links=[];

  $('li.mainNavigation-link-subMenu-link.mainNavigation-link-subMenu-link--image').each((i,element)=>{
    if(i<14){
      //links.push($(element).find('a').attr('href'));

      const link=$(element).find('a').attr('href');
      links.push(link);
    }
    
    

    });
    console.log(links);

      
*/
      return $('.productList-container .productList')
      .map((i, elem) => {
        const name = $(elem)
          .find('.productList-title')
          .text()
          .trim()
          .replace(/\s/g, ' ');
        const price = parseInt(
          $(elem)
            .find('.productList-price')
            .text()
        );

        return {name, price};
      })
      .get();



    }

    
    
    
   

   


/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */





module.exports.scrape = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);

  return null;
};
