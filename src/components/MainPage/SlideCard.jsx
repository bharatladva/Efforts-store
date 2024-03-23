/** @format */

import React from "react";
import { Link } from "react-router-dom";

const SlideCard = ({ productItem }) => {
	// Check if productItem is defined and not null
	if (!productItem) {
		return null; // or any other fallback UI you prefer
	}

	return (
		<>
			<Link
				key={0}
				to={`/productPage/${productItem._id}`}
			>
				<div className='box d_flex top'>
					<div className='left'>
						<h1>{productItem.name}</h1>
						<p>{productItem.catagoriy}</p>
						<p>{productItem.tital}</p>
						<button className='btn-primary'>Visit</button>
					</div>
					<div className='home-slide-right'>
						<img
							src={productItem.mainImage}
							alt=''
						/>
					</div>
				</div>
			</Link>
		</>
	);
};

export default SlideCard;
