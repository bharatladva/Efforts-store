/** @format */

import React from "react";
import Catg from "./Catg";

import "./style.css";
import FlashCard from "../flashDeals/FlashCard";

import sdata from "./Sdata";

const { shopItems } = sdata;

const Shop = () => {
	return (
		<>
			<section className='shop background'>
				<div className='container d_flex'>
					<Catg />

					<div className='contentWidth'>
						<div className='heading d_flex'>
							<div className='heading-left row  f_flex'>
								<h2>Mobile Phones</h2>
							</div>
							<div className='heading-right row '>
								<span>View all</span>
								<i className='fa-solid fa-caret-right'></i>
							</div>
						</div>
						<div className='product-content  grid1'>
							{shopItems.map((productItem) => (
								<div>
									<FlashCard
										key={productItem._id}
										productItems={productItem}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Shop;
