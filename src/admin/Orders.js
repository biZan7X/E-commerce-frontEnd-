import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const Order = () => {
   return (
      <Base title="Welcome admin" description="Manage the orders here">
         <h1>Oops!... Under Construction.</h1>
         <h2>We will be back very soon...</h2>
         <h1> ....</h1>

         <Link to="/admin/dashboard" className="btn btn-md btn-success mb-3">
            Admin Home
         </Link>
         <h3>Till then let's go back to DashBoard</h3>
      </Base>
   );
};

export default Order;
