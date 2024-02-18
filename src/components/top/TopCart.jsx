/** @format */

import React from "react";
import { Link } from "react-router-dom";

const TopCart = ({ productItems }) => {
	const { _id, name, price, mainImage, discount } = productItems;
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
					<div className='nametop d_flex'>
						{/*<span className='tleft'>{value.para}</span>*/}
						{/*<span className='tright'>{value.desc}</span>*/}
					</div>
					<div className='img'>
						<img
							src={mainImage}
							alt=''
						/>
					</div>
				</div>
			</Link>
		</>
	);
};

export default TopCart;
