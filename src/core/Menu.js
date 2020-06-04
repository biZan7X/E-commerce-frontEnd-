import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom"; //withRouter is used for the compatibility btw the
import { signout, isAuthenticated } from "../auth/helper";
//navigation bar and the router file , so that it can pick up routes using links and connect them from routes

const currentTab = (history, path) => {
   if (history.location.pathname === path) {
      return { color: "#2ecc72" };
   } else {
      return { color: "#FFFFFF" };
   }
};

const Menu = ({ history }) => (
   <div>
      <ul className="nav nav-tabs bg-dark">
         <li className="nav-item">
            <Link style={currentTab(history, "/")} className="nav-link" to="/">
               Home
            </Link>
         </li>
         <li className="nav-item">
            <Link
               style={currentTab(history, "/cart")}
               className="nav-link"
               to="/cart"
            >
               Cart
            </Link>
         </li>
         {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
               <Link
                  style={currentTab(history, "/user/dashboard")}
                  className="nav-link"
                  to="/user/dashboard"
               >
                  DashBoard
               </Link>
            </li>
         )}
         {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
               <Link
                  style={currentTab(history, "/admin/dashboard")}
                  className="nav-link"
                  to="/admin/dashboard"
               >
                  AdminDashBoard
               </Link>
            </li>
         )}
         {!isAuthenticated() && (
            <Fragment>
               <li className="nav-item">
                  <Link
                     style={currentTab(history, "/signUp")}
                     className="nav-link"
                     to="/signUp"
                  >
                     SignUp
                  </Link>
               </li>
               <li className="nav-item">
                  <Link
                     style={currentTab(history, "/signIn")}
                     className="nav-link"
                     to="/signIn"
                  >
                     SignIn
                  </Link>
               </li>
            </Fragment>
         )}
         {isAuthenticated() && (
            <li className="nav-item">
               <span
                  className="nav-link text-warning"
                  onClick={() => {
                     //we are using signout() and this comes with a callback() as it is a middleware
                     signout(() => {
                        history.push("/");
                     });
                  }}
               >
                  SignOut
               </span>
            </li>
         )}
      </ul>
   </div>
);

export default withRouter(Menu);
