import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";

const ManageProducts = () => {
   const [products, setProducts] = useState([]); //since loading an array

   const { user, token } = isAuthenticated();

   const preload = () => {
      getProducts().then((data) => {
         if (data.error) {
            console.log(data.error);
         } else {
            setProducts(data);
         }
      });
   };

   useEffect(() => {
      preload();
   }, []);

   const deleteMyProduct = (productId) => {
      deleteProduct(productId, user._id, token).then((data) => {
         if (data.error) {
            console.log(data.error);
         } else {
            preload(); //everytime the func inside the useEffect get called , react reloads
         }
      });
   };

   const getCount = () => {
      let count = 0;
      products.map((p) => {
         count = count + 1;
      });
      return count;
   };

   const currentProd = getCount();

   return (
      <Base title="Welcome admin" description="Manage products here">
         <h2 className="mb-4">All products:</h2>
         <Link className="btn btn-info" to={`/admin/dashboard`}>
            <span className="">Admin Home</span>
         </Link>
         <div className="row">
            <div className="col-12">
               <h2 className="text-center text-white my-3">
                  Total Products : {currentProd}
               </h2>

               {products.map((product, index) => {
                  return (
                     <div key={index} className="row text-center mb-2 ">
                        <div className="col-4">
                           <h3 className="text-white text-left">
                              {product.name}
                           </h3>
                        </div>
                        <div className="col-4">
                           <Link
                              className="btn btn-success"
                              to={`/admin/product/update/${product._id}`}
                           >
                              <span className="">Update</span>
                           </Link>
                        </div>
                        <div className="col-4">
                           <button
                              onClick={() => {
                                 deleteMyProduct(product._id); //reason of using this inside a callback is that we are not allowed to call a function as func() in jsx , but we need to pass parameter so we use callback
                              }}
                              className="btn btn-danger"
                           >
                              Delete
                           </button>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </Base>
   );
};

export default ManageProducts;
