import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./core/Home";
import signup from "./user/Signup";
import signin from "./user/Signin";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminRoute from "./auth/helper/AdminRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Cart from "./core/Cart";
import Order from "./admin/Orders";

const Routes = () => {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signUp" component={signup} />
            <Route path="/signIn" component={signin} />
            <Route path="/cart" component={Cart} />
            <PrivateRoute path="/user/dashboard" component={UserDashBoard} />
            <AdminRoute path="/admin/dashboard" component={AdminDashBoard} />
            <AdminRoute path="/admin/create/category" component={AddCategory} />
            <AdminRoute path="/admin/create/product" component={AddProduct} />
            <AdminRoute path="/admin/products" component={ManageProducts} />
            <AdminRoute path="/admin/orders" component={Order} />
            <AdminRoute
               path="/admin/product/update/:productId"
               exact
               component={UpdateProduct}
            />
         </Switch>
      </Router>
   );
};

export default Routes;
