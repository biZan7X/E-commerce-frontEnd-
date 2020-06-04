import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
   //this func makes a call to the backend to store the order in DB
   return fetch(`${API}/order/create/${userId}`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ order: orderData }),
   })
      .then((Response) => {
         return Response.json();
      })
      .catch((err) => console.log(err));
};
