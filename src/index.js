const { products } = require('./data/products.json');
 
const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];
 
function getShoppingCart(ids = [], productsList = []) {
   const categories = [];
   let totalPrice = 0;
   let totalRegular = 0;
 
   const getProductsId = productsList.filter((item) =>
       ids.find((aux) => aux === item.id)
   );
 
   getProductsId.forEach((item) => {
       if (!categories.find((aux) => aux === item.category)) {
           categories.push(item.category);
       }
   });
 
   const calculatePrice = getProductsId.map((item) => {
       let regularPrice = item.regularPrice;
 
       item.promotions.forEach((aux) => {
           const { looks, price } = aux;
           if (looks.find((aux2) => aux2 === promotions[categories.length -1])) {
               regularPrice = price;
           }
       });
 
       totalPrice += regularPrice;
       totalRegular += item.regularPrice;
 
       return {
           name: item.name,
           category: item.category,
        }
   });
   
   return {
       products: calculatePrice,
       promotion: promotions[categories.length - 1],
       totalPrice: totalPrice.toFixed(2),
       discountValue: ( totalRegular - totalPrice ).toFixed(2),
       discount:`${(((totalRegular - totalPrice) / totalRegular) * 100).toFixed(2)}`+'%',
   }
}

module.exports = { getShoppingCart };