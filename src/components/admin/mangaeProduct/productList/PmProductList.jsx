/** @format */

import React, { useContext } from "react";
import Product from "./PmProduct";
import { ProductContext } from "./../ManageProduct"; // Correct import

export default function PmProductList(props) {
	const { products } = props;
	const { handleProductAdd } = useContext(ProductContext);

	return (
		<div className='recipe-list'>
			<div>
				{products.map((product) => {
					return (
						<Product
							key={product.id}
							{...product}
						/>
					);
				})}
			</div>
			<div className='recipe-list__add-recipe-btn-container'>
				<button
					className='btn btn--primary'
					onClick={handleProductAdd}
				>
					Add Product
				</button>
			</div>
		</div>
	);
}
