/** @format */

import React from "react";

export default function ReviewEdit(props) {
	const { review, handleReviewChange, handleReviewDelete } = props;

	function handleChange(changes) {
		handleReviewChange(review.id, { ...review, ...changes });
	}
	return (
		<>
			<input
				className='recipe-edit__input'
				type='text'
				onChange={(e) => handleChange({ name: e.target.value })}
				value={review.name}
			/>
			<input
				className='recipe-edit__input'
				type='text'
				onChange={(e) => handleChange({ msg: e.target.value })}
				value={review.msg}
			/>
			<button
				className='btn btn--danger'
				onClick={() => handleReviewDelete(review.id)}
			>
				&times;
			</button>
		</>
	);
}
