/** @format */

import React, { useRef, useEffect, useState } from "react";
import Catg from "./Catg";

import "./style.css";
import FlashCard from "../flashDeals/FlashCard";
const API_URL = process.env.REACT_APP_API_URL;

const Shop = () => {
	const [products, setProducts] = useState();

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			const response = await fetch(`${API_URL}/products?addTo=Shope`);
			//const response = await fetch(`${API_URL}/products?addTo=Flash Delas`);
			const data = await response.json();

			setProducts(data.data.products);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	return (
		<>
			<section className='shop background'>
				<div className='container d_flex'>
					<Catg />

					<div className='contentWidth'>
						<div className='heading d_flex'>
							<div className='heading-left row  f_flex'>
								<h2>Solar Products</h2>
							</div>
							<div className='heading-right row '>
								<span>View all</span>
								<i className='fa-solid fa-caret-right'></i>
							</div>
						</div>
						<div className='product-content  grid1'>
							{products ? (
								products.map((productItem) => (
									<FlashCard
										key={productItem._id}
										productItems={productItem}
									/>
								))
							) : (
								<p>Loading...</p>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Shop;
