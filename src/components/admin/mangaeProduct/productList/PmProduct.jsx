/** @format */

import React, { useContext } from "react";

import ReviewsList from "../reviews/ReviewsList";
import { ProductContext } from "./../ManageProduct";
export default function PmProduct(props) {
	const { handleProductDelete, handleProductSelect } = useContext(ProductContext);
	const { id, name, price, tital, catagoriy, discount, discription, reviews } = props;
	return (
		<div className='recipe'>
			<div className='recipe__header'>
				<h3 className='recipe__title'>{name}</h3>
				<div>
					<button
						className='btn btn--primary mr-1'
						onClick={() => handleProductSelect(id)}
					>
						Edit
					</button>
					<button
						className='btn btn--danger'
						onClick={() => handleProductDelete(id)}
					>
						Delete
					</button>
				</div>
			</div>
			<div className='recipe__row'>
				<span className='recipe__label'>tital:</span>
				<span className='recipe__value'>{tital}</span>
			</div>
			<div className='recipe__row'>
				<span className='recipe__label'>catagoriy:</span>
				<span className='recipe__value'>{catagoriy}</span>
			</div>
			<div className='recipe__row'>
				<span className='recipe__label'>price:</span>
				<span className='recipe__value'>{price}</span>
			</div>
			<div className='recipe__row'>
				<span className='recipe__label'>discount:</span>
				<span className='recipe__value'>{discount}</span>
			</div>

			<div className='recipe__row'>
				<span className='recipe__label'>discription:</span>
				<div className='recipe__value recipe__instructions recipe__value--indented'>
					{discription}
				</div>
			</div>
			<div className='recipe__row'>
				<span className='recipe__label'>Reviews:</span>
				<div className='recipe__value recipe__value--indented'>
					{<ReviewsList reviews={reviews} />}
				</div>
			</div>
		</div>
	);
}
