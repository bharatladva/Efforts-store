/** @format */

import React from "react";
import Ndata from "./Ndata";
import { Link } from "react-router-dom";

const Cart = () => {
	return (
		<>
			<div className='content grid product'>
				{Ndata.map((val, index) => {
					return (
						<Link
							key={index}
							to={`/productPage/${val.id}`}
						>
							<div
								className='box'
								key={index}
							>
								<div className='img'>
									<img
										src={val.mainImage}
										alt=''
									/>
								</div>
								<h4>{val.name}</h4>
								<span>₹{val.price}</span>
							</div>
						</Link>
					);
				})}
			</div>
		</>
	);
};

export default Cart;
