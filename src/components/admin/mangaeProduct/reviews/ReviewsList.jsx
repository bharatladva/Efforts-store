/** @format */

import React from "react";
import Reviews from "./Reviews";

export default function ReviewsList({ reviews }) {
	const ReviewstElements = reviews.map((review) => {
		return (
			<Reviews
				key={review.id}
				{...review}
			/>
		);
	});
	return <div>{ReviewstElements}</div>;
}
