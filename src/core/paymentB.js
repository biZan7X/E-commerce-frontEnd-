import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/CartHelper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentBHelper"; //request making funcs to process payment
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const PaymentB = ({ products, setReload = (f) => f, reload = undefined }) => {
   const [info, setInfo] = useState({
      loading: false,
      success: false,
      clientToken: null,
      error: "",
      instance: {}, //it is nothing it automatically gets filled up by the requests
   });

   const userId = isAuthenticated() && isAuthenticated().user._id;
   const token = isAuthenticated() && isAuthenticated().user.token;

   const getToken = (userId, token) => {
      getmeToken(userId, token).then((info) => {
         console.log("INFORMATION: ", info);
         if (info.error) {
            setInfo({ ...info, error: info.error });
         } else {
            const clientToken = info.clientToken;
            setInfo({ clientToken });
         }
      });
   };

   /*const showbtDropIn = () => {
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
                     onClick={() => {}}
                  >
                     Buy
                  </button>
               </div>
            ) : (
               <h2>Add some items to proceed</h2>
            )}
         </div>
      );
   };*/

   useEffect(() => {
      getToken(userId, token);
   }, []);

   return (
      <div>
         <h2>Checkout & Payments</h2>
      </div>
   );
};

export default PaymentB;
