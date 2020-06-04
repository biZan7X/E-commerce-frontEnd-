import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper"; //TODO//

const Signup = () => {
   const [values, setValues] = useState({
      name: "",
      email: "",
      password: "",
      error: "",
      success: false,
   });

   const { name, email, password, error, success } = values; //destrucring to access directly

   const handleChange = (name) => (event) => {
      //here name is the para passed to us
      setValues({ ...values, error: false, [name]: event.target.value }); //loading the pre values, error - false, changing the para passed with the values that came with handlechange event listener
   };

   const onSubmit = (event) => {
      //for submiting the values
      event.preventDefault(); //you saw this why in healthyEat
      setValues({ ...values, error: false });
      signup({ name, email, password }) //passing the info to make a request to backend
         .then((data) => {
            if (data.error) {
               setValues({ ...values, error: data.error, success: false });
            } else {
               //we surved the purpose of the request now we are goin to clear the state for next input
               setValues({
                  ...values,
                  name: "",
                  email: "",
                  password: "",
                  error: "",
                  success: true,
               });
            }
         })
         .catch(console.log("error in signup!"));
   };

   const signUpForm = () => {
      return (
         <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
               <form>
                  <div className="form group">
                     <label className="text-light">Name</label>
                     <input
                        className="form-control"
                        onChange={handleChange("name")}
                        type="text"
                        value={
                           name
                        } /*it is used for restoring to default blank */
                     />
                  </div>
                  <div className="form-group">
                     <label className="text-light">Email</label>
                     <input
                        className="form-control"
                        onChange={handleChange("email")}
                        type="email"
                        value={email}
                     />
                  </div>
                  <div className="form-group">
                     <label className="text-light">Password</label>
                     <input
                        className="form-control"
                        onChange={handleChange("password")}
                        type="password"
                        value={password}
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

   const successMessage = () => {
      return (
         <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
               <div
                  className="alert alert-success"
                  style={{ display: success ? "" : "none" }} //if success then show the msg else "none"
               >
                  Sign up successful ! Please{" "}
                  <Link to="/signIn">Login Here</Link> to continue.
               </div>
            </div>
         </div>
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
      <Base title="SignUp" description="Join Our Family!">
         {successMessage()}
         {errorMessage()}
         {signUpForm()}
      </Base>
   );
};

export default Signup;
