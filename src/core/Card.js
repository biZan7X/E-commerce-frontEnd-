import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";

const Card = ({
   product,
   addToCart = true,
   removeFromCart = false,
   setReload = (f) => f, //it means the function(f) returns f , the returns the same value it was passed
   reload = undefined,
}) => {
   const [redirect, setRedirect] = useState(false);
   const [count, setCount] = useState(product.count); //no idea

   const cardTitle = product ? product.name : "biZan Merch";
   const cardDescription = product
      ? product.description
      : "Default Description";
   const cardPrice = product ? product.price : "NA";

   const addtoCart = () => {
      addItemToCart(product, () => setRedirect(true)); //with this func items gets passed to the cart loaclly and redirect is set true
   };

   const getARedirect = (redirect) => {
      if (redirect) {
         return <Redirect to="/cart" />;
      }
   };

   const showAddToCart = (addToCart) => {
      return (
         addToCart && (
            <button
               onClick={addtoCart}
               className="btn btn-block btn-outline-success mt-2 mb-2"
            >
               Add to Cart
            </button>
         )
      );
   };

   const showRemoveFromCart = (removeFromCart) => {
      return (
         removeFromCart && (
            <button
               onClick={() => {
                  removeItemFromCart(product._id);
                  setReload(!reload); //it is false or true does not really matters , the value of reload will cahnge everytime
               }}
               className="btn btn-block btn-outline-danger mt-2 mb-2"
            >
               Remove from cart
            </button>
         )
      );
   };

   return (
      <div className="card text-white bg-dark border border-info ">
         <div className="card-header lead">{cardTitle}</div>
         <div className="card-body">
            {getARedirect(redirect)}
            <div className="rounded border border-success p-2">
               <ImageHelper product={product} />
            </div>
            <p className="lead bg-success font-weight-normal text-wrap">
               {cardDescription}
            </p>
            <p className="btn btn-success rounded  btn-sm px-4">
               ₹ {cardPrice}
            </p>
            <div className="row">
               <div className="col-12">{showAddToCart(addToCart)}</div>
               <div className="col-12">
                  {showRemoveFromCart(removeFromCart)}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Card;
