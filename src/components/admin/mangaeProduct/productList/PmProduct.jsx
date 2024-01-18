/** @format */

import React, { useContext } from "react";

import { ProductContext } from "./../ManageProduct";
export default function PmProduct(props) {
	const { handleProductDelete, handleProductSelect } = useContext(ProductContext);
	const { _id, id, name, price, catagoriy, discount, mainImage } = props;
	return (
		<div className='recipe'>
			<div className='recipe__header'>
				<h1 className='recipe__title'>{name}</h1>
				<div>
					<button
						className='btn btn--primary mr-1'
						onClick={() => handleProductSelect(id)}
					>
						Edit
					</button>
					<button
						className='btn btn--danger'
						onClick={() => handleProductDelete(_id)}
					>
						Delete
					</button>
				</div>
			</div>

			<div className='recipe-Values'>
				<div
					style={{
						width: "150px",
						height: "150px",
					}}
				>
					{mainImage ? (
						<img
							src={mainImage}
							alt='not found'
						/>
					) : (
						<p>No main image.</p>
					)}
				</div>

				<div className='recipe-ditaails'>
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
				</div>
			</div>
		</div>
	);
}
