import React, { useEffect, useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import getProducts from "./helper/coreapicalls";

export default function Home() {
	const [products, setProducts] = useState([]);
	const [errors, setErrors] = useState(false);

	const loadAllProducts = () => {
		getProducts().then((data) => {
			if (data.error) {
				setErrors(data.error);
			} else {
				setProducts(data);
			}
		});
	};

	useEffect(() => {
		loadAllProducts();
	}, []);

	return (
		<Base
			title="Home Page"
			description="The Official biZan Merch Store"
			className="bg-dark text-white text-center"
		>
			<div className="row text-center">
				<h1 className="text-white py-4">
					<u>Merchandises</u>:
				</h1>
				<div className="row">
					{products.map((product, index) => {
						return (
							<div key={index} className="col-4 mb-4">
								<Card product={product} />
							</div>
						);
					})}
				</div>
			</div>
			<a
				href="https://dogechats.netlify.app/"
				style={{
					border: "blue solid 2px",
					borderRadius: "2rem",
					padding: "0.5rem 0.75rem",
					color: "white",
					cursor: "pointer",
					margin: "2rem",
				}}
			>
				Discussion Room
			</a>
		</Base>
	);
}
