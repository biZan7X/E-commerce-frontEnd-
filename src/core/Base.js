import React from "react";

const Base = ({
  title = "My Title", //default arguments
  description = "My description",
  className = "bg-dark text-white text-center py-4",
  children, //once we use children , this base component acts as an enclosing parent for the chldren component
}) => {
  return (
    <div>
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>If you got any questions feel free to reach us!</h4>
          <button className="btn btn-warning btn-lg">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted">
            Amazing <span className="text-white">Merch</span> Store
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
