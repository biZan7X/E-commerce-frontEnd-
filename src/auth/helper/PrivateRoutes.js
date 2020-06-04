import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

//this syntax is coming straight from reacttraning.com
const PrivateRoute = ({ component: Component, ...rest }) => {
   return (
      <Route
         {...rest}
         render={(props) =>
            isAuthenticated() ? ( //basically if we are authenticated to use the route then it gets loaded else we are redirected to other page
               <Component {...props} />
            ) : (
               <Redirect
                  to={{
                     pathname: "/signIn",
                     state: { from: props.location },
                  }}
               />
            )
         }
      />
   );
};

export default PrivateRoute;
