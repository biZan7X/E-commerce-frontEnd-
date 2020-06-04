export const addItemToCart = (item, next) => {
   let cart = [];

   if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
         //if there is already some item in local cart assigning them to cart
         cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.push({
         //apending things from the item
         ...item,
         count: 1, //no idea
      });
      localStorage.setItem("cart", JSON.stringify(cart)); //setting local cart = cart
      next(); //since a middleware expecting a callback func after this
   }
};

export const loadCart = () => {
   //returns the cart items
   if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
         return JSON.parse(localStorage.getItem("cart"));
      }
   }
};

export const removeItemFromCart = (productId) => {
   let cart = [];

   if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
         cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, index) => {
         //iterating over the old cart and deleting the one we want
         if (product._id === productId) {
            cart.splice(index, 1); //splice is a method to delete on the go
         }
      });
      localStorage.setItem("cart", JSON.stringify(cart)); //setting the new cart
   }
   return cart;
};

export const cartEmpty = (next) => {
   //function to empty the cart
   if (typeof window !== undefined) {
      localStorage.removeItem("cart");
      next();
   }
};
