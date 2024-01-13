/** @format */

import React, { useContext } from "react";

import ReviewEdit from "./../reviews/ReviewEdit";
import { ProductContext } from "./../ManageProduct";
import { v4 as uuidv4 } from "uuid";

export default function ProductEdit({ product }) {
	const { handleProductChange, handleProductSelect } = useContext(ProductContext);

	function handleChange(changes) {
		handleProductChange(product.id, { ...product, ...changes });
	}

	function handleReviewChange(id, review) {
		const newReviews = [...product.reviews];
		const index = newReviews.findIndex((i) => i.id === id);
		newReviews[index] = review;
		handleChange({ reviews: newReviews });
	}

	function handleReviewAdd() {
		const newReview = {
			id: uuidv4(),
			name: "",
			msg: "",
		};
		handleChange({ reviews: [...product.reviews, newReview] });
	}

	function handleReviewDelete(id) {
		handleChange({
			reviews: product.reviewss.filter((i) => i.id !== id),
		});
	}

	return (
		<div className='recipe-edit'>
			<div className='recipe-edit__remove-button-container'>
				<button
					className='btn recipe-edit__remove-button'
					onClick={() => handleProductSelect(undefined)}
				>
					&times;
				</button>
			</div>
			<div className='recipe-edit__details-grid'>
				<label
					htmlFor='name'
					className='recipe-edit__label'
				>
					Name
				</label>
				<input
					type='text'
					name='name'
					id='name'
					value={product.name}
					onChange={(e) => handleChange({ name: e.target.value })}
					className='recipe-edit__input'
				/>
				<label
					htmlFor='tital'
					className='recipe-edit__label'
				>
					Tital
				</label>
				<input
					type='text'
					name='tital'
					id='tital'
					value={product.tital}
					onChange={(e) => handleChange({ tital: e.target.value })}
					className='recipe-edit__input'
				/>
				<label
					htmlFor='catagoriy'
					className='recipe-edit__label'
				>
					catagoriy
				</label>
				<input
					type='text'
					name='catagoriy'
					id='catagoriy'
					value={product.catagoriy}
					onChange={(e) => handleChange({ catagoriy: e.target.value })}
					className='recipe-edit__input'
				/>
				<label
					htmlFor='price'
					className='recipe-edit__label'
				>
					Price
				</label>
				<input
					type='number'
					min='1'
					name='servings'
					id='servings'
					value={product.price}
					onChange={(e) => handleChange({ price: parseInt(e.target.value) || "" })}
					className='recipe-edit__input'
				/>
				<label
					htmlFor='discount'
					className='recipe-edit__label'
				>
					discount
				</label>
				<input
					type='number'
					min='1'
					name='discount'
					id='discount'
					value={product.discount}
					onChange={(e) => handleChange({ discount: parseInt(e.target.value) || "" })}
					className='recipe-edit__input'
				/>
				<label
					htmlFor='stock'
					className='recipe-edit__label'
				>
					stock
				</label>
				<input
					type='number'
					min='1'
					name='stock'
					id='stock'
					value={product.stock}
					onChange={(e) => handleChange({ stock: parseInt(e.target.value) || "" })}
					className='recipe-edit__input'
				/>
				<label
					htmlFor='discription'
					className='recipe-edit__label'
				>
					discription
				</label>
				<textarea
					name='discription'
					className='recipe-edit__input'
					onChange={(e) => handleChange({ discription: e.target.value })}
					value={product.discription}
					id='discription'
				/>
			</div>
			<br />
			<label className='recipe-edit__label'>reviews</label>
			<div className='recipe-edit__ingredient-grid'>
				<div>Name</div>
				<div>msg</div>
				<div></div>
				{product.reviews.map((review) => (
					<ReviewEdit
						key={review.id}
						handleReviewChange={handleReviewChange}
						handleReviewDelete={handleReviewDelete}
						review={review}
					/>
				))}
			</div>
			<div className='recipe-edit__add-ingredient-btn-container'>
				<button
					className='btn btn--primary'
					onClick={() => handleReviewAdd()}
				>
					Add Ingredient
				</button>
			</div>
		</div>
	);
}
