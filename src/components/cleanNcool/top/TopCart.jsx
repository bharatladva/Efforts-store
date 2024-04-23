/** @format */

import React from "react";
import { Link } from "react-router-dom";

const TopCart = ({ productItems }) => {
	const { _id, name, price, url, discount } = productItems;
	return (
		<>
			<Link
				key={_id}
				to={`/ServicePage/${_id}`}
			>
				<div
					className='topCart'
					key={_id}
				>
					<div className='nametop d_flex'>
						{/*<span className='tleft'>{value.para}</span>*/}
						{/*<span className='tright'>{value.desc}</span>*/}
					</div>

					<img
						src={url}
						alt=''
					/>
				</div>
			</Link>
		</>
	);
};

export default TopCart;
