import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper"; //this authenticate i skinda like  middleware

const Signin = () => {
   const [values, setValues] = useState({
      email: "biswanathtewari@outlook.com",
      password: "12345",
      error: "",
      loading: false,
      didRedirect: false, //redirecting from the signin page to user/admin dashboard after success
   });

   const { email, password, error, loading, didRedirect } = values;
   const { user } = isAuthenticated();

   const handleChange = (name) => (event) => {
      //here name is the para passed to us
      setValues({ ...values, error: false, [name]: event.target.value }); //loading the pre values, error - false, changing the para passed with the values that came with handlechange event listener
   };

   const onSubmit = (event) => {
      event.preventDefault();
      setValues({ ...values, error: false, loading: true });

      signin({ email, password }) //passing it to the request making method
         .then((data) => {
            if (data.error) {
               setValues({ ...values, error: data.error, loading: false });
            } else {
               authenticate(data, () => {
                  //inplace of next we can write a callback function
                  setValues({
                     ...values,
                     didRedirect: true,
                  });
               });
            }
         })
         .catch(console.log("signIn request failed ! Try again."));
   };

   const performRedirect = () => {
      if (didRedirect) {
         if (user && user.role === 1) {
            return <Redirect to="/admin/dashboard" />;
         } else {
            return <Redirect to="/user/dashboard" />;
         }
      }

      if (isAuthenticated()) {
         //after signin if we again click on signin then redirecting to the home page which is common to both
         return <Redirect to="/" />;
      }
   };

   const signInForm = () => {
      return (
         <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
               <form>
                  <div className="form-group">
                     <label className="text-light">Email</label>
                     <input
                        value={email}
                        onChange={handleChange("email")}
                        className="form-control"
                        type="email"
                     />
                  </div>

                  <div className="form-group">
                     <label className="text-light">Password</label>
                     <input
                        value={password}
                        onChange={handleChange("password")}
                        className="form-control"
                        type="password"
                     />
                  </div>
                  <button
                     onClick={onSubmit}
                     className="btn btn-success btn-block"
                  >
                     Submit
                  </button>
               </form>
            </div>
         </div>
      );
   };

   const loadingMessage = () => {
      return (
         loading && ( //basically return ( a && b), if both are true then only will work else not , alter to if else
            <div className="row">
               <div className="col-md-6 offset-sm-3 text-left">
                  <div className="alert alert-info">
                     <h2>loading...</h2>
                  </div>
               </div>
            </div>
         )
      );
   };

   const errorMessage = () => {
      return (
         <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
               <div
                  className="alert alert-danger"
                  style={{ display: error ? "" : "none" }} //if success then show the msg else "none"
               >
                  {error}
               </div>
            </div>
         </div>
      );
   };

   return (
      <Base title="SignIn" description="Welcome Back!">
         {performRedirect()}
         {loadingMessage()}
         {errorMessage()}
         {signInForm()}
      </Base>
   );
};

export default Signin;
