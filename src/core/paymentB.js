//PaymentB.js
import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/CartHelper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentBHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const Paymentb = ({ products, setReload = (f) => f, reload = undefined }) => {
   const [info, setInfo] = useState({
      loading: false,
      success: false,
      clientToken: null,
      error: "",
      instance: {},
   });

   const userId = isAuthenticated() && isAuthenticated().user._id;
   const token = isAuthenticated() && isAuthenticated().token;

   const getToken = (userId, token) => {
      getmeToken(userId, token).then((info) => {
         console.log("INFORMATION", info);
         if (info?.error) {
            setInfo({ ...info, error: info.error });
         } else {
            const clientToken = info?.clientToken || "empty";
            setInfo({ clientToken });
         }
      });
   };

   const showbtdropIn = () => {
      return (
         <div>
            {info.clientToken !== null && products.length > 0 ? (
               <div>
                  <DropIn
                     options={{ authorization: info.clientToken }}
                     onInstance={(instance) => (info.instance = instance)}
                  />
                  <button
                     className="btn btn-block btn-success"
                     onClick={onPurchase}
                  >
                     Buy
                  </button>
               </div>
            ) : (
               <h3>Please add something to cart</h3>
            )}
         </div>
      );
   };

   useEffect(() => {
      getToken(userId, token);
   }, []);

   const onPurchase = () => {
      setInfo({ loading: true });
      let nonce;
      let getNonce = info.instance.requestPaymentMethod().then((data) => {
         nonce = data.nonce;
         const paymentData = {
            paymentMethodNonce: nonce,
            amount: getAmount(), //convert to rupees
         };
         processPayment(userId, token, paymentData)
            .then((Response) => {
               setInfo({ ...info, success: Response.success, loading: false });
               console.log("PAYMENT SUCCESS");
            })
            .catch((error) => {
               setInfo({ loading: false, success: false });
               console.log("PAYMENT FAILED");
            });
      });
   };

   const getAmount = () => {
      let amount = 0;
      products.map((p) => {
         amount = amount + p.price;
      });
      return amount;
   };

   return (
      <div>
         <h3>Payments</h3>
         {showbtdropIn()}
         <h3></h3>
         <h3>Your bill is : ₹ {getAmount()}</h3>
      </div>
   );
};

export default Paymentb;
