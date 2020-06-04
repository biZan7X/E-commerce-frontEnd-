import { API } from "../../backend";

export const signup = (user) => {
   return fetch(`${API}/signUp`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

export const signin = (user) => {
   return fetch(`${API}/signIn`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
   //it is used to store the jwt of the loggedIn user
   if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(data));
      next();
   }
};

export const signout = (next) => {
   //by making it a middleware/next it gives an oppurtunity to inject a clallback just after this method , to redirect to some route
   if (typeof window !== "undefined") {
      //removing the token
      localStorage.removeItem("jwt");
      next();

      return fetch(`${API}/signOut`, {
         method: "GET",
      })
         .then((response) => console.log("signOut success"))
         .catch((err) => console.log(err));
   }
};

export const isAuthenticated = () => {
   if (typeof window == "undefined") {
      return false;
   }

   if (localStorage.getItem("jwt")) {
      //if we can get the access of jwt , then we are returning it to the frontend for further checking
      return JSON.parse(localStorage.getItem("jwt"));
   } else {
      return false;
   }
};
