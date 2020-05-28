import React from "react";
import Routes from "./Routes";
import ReactDOM from "react-dom";

ReactDOM.render(<Routes />, document.getElementById("root"));

//earlier we were writing the routings and rendering in the index.js itself , but instead now we are going to
//write the routes in a separate routes.js file and then we will render it here !
