import React, { useEffect, useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import PaymentB from "./paymentB";

const Cart = () => {
   const [products, setProducts] = useState([]);
   const [reload, setReload] = useState(false);

   useEffect(() => {
      //prefetching the products
      setProducts(loadCart());
   }, [reload]);

   const loadAllProducts = (products) => {
      return (
         <div>
            <h2>Your wish list</h2>
            {products.map((product, index) => (
               <Card
                  key={index}
                  product={product}
                  addToCart={false}
                  removeFromCart={true}
                  setReload={setReload} //passing the paras
                  reload={reload}
               />
            ))}
         </div>
      );
   };

   const loadCheckOut = () => {
      return (
         <div>
            <h2>Checkout & payments</h2>
         </div>
      );
   };

   return (
      <Base title="Shopping Cart" description="Ready to checkout">
         <div className="row text-center">
            <div className="col-6">
               {products.length > 0 ? (
                  loadAllProducts(products)
               ) : (
                  <h3>Your Cart is Empty bro..</h3>
               )}
            </div>
            <div className="col-6">
               <PaymentB
                  products={products}
                  setReload={setReload}
                  reload={reload}
               />
            </div>
         </div>
      </Base>
   );
};

export default Cart;
