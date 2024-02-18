/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Dcard = ({ productItems }) => {
	const { _id, name, price, mainImage } = productItems;
	return (
		<>
			<Link
				key={_id}
				to={`/productPage/${_id}`}
			>
				<div
					className='box product'
					key={_id}
				>
					<div className='img'>
						<img
							src={mainImage}
							alt=''
							width='100%'
						/>
					</div>
					<h4>{name}</h4>
					<span>₹{price}</span>
				</div>
			</Link>
		</>
	);
};

export default Dcard;
