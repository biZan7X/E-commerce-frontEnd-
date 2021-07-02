import React from "react";
import Menu from "./Menu";
import logo from "../logo.png";

/*
LOGO:
<div className="logo-bar">
                  <img className="logo" alt="" src={logo} />
               </div>
*/

const Base = ({
	title = "My Title", //default arguments
	description = "My description",
	className = "bg-dark text-white text-center py-4",
	children, //once we use children , this base component acts as an enclosing parent for the chldren component
}) => {
	return (
		<div>
			<Menu />
			<div className="container-fluid">
				<div className="jumbotron bg-dark text-white text-center">
					<h2 className="display-4">{title}</h2>
					<p className="lead">{description}</p>
				</div>
				<div className={className}>{children}</div>
			</div>
			<footer className="footer bg-dark mt-3 mb-1 py-3">
				<div className="container-fluid bg-success text-white text-center py-3">
					<h4>If you got any questions feel free to reach us!</h4>
					<button className="btn btn-warning btn-lg">Contact Us</button>
				</div>
				<div className="container">
					<span className="text-muted">
						Amazing <span className="text-white">biZan Merch Store©</span>{" "}
						2020-21
					</span>
				</div>
			</footer>
		</div>
	);
};

export default Base;
